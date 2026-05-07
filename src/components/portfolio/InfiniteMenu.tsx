import { useEffect, useRef, useState } from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";
import "./InfiniteMenu.css";

type MenuItem = {
  image: string;
  link: string;
  title: string;
  description: string;
  id?: string;
};

type InfiniteMenuProps = {
  items: MenuItem[];
  scale?: number;
  onItemAction?: (item: MenuItem) => void;
};

const discVertShaderSource = `#version 300 es
uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;
in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;
out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;
void main() {
  vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);
  vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
  float radius = length(centerPos.xyz);
  if (gl_VertexID > 0) {
    vec3 rotationAxis = uRotationAxisVelocity.xyz;
    float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
    vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
    vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
    float strength = dot(stretchDir, relativeVertexPos);
    float invAbsStrength = min(0., abs(strength) - 1.);
    strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
    worldPosition.xyz += stretchDir * strength;
  }
  worldPosition.xyz = radius * normalize(worldPosition.xyz);
  gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
  vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
  vUvs = aModelUvs;
  vInstanceId = gl_InstanceID;
}`;

const discFragShaderSource = `#version 300 es
precision highp float;
uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;
out vec4 outColor;
in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;
void main() {
  int itemIndex = vInstanceId % uItemCount;
  int cellsPerRow = uAtlasSize;
  int cellX = itemIndex % cellsPerRow;
  int cellY = itemIndex / cellsPerRow;
  vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
  vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;
  vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
  st = clamp(st, 0.0, 1.0);
  st = st * cellSize + cellOffset;
  outColor = texture(uTex, st);
  outColor.a *= vAlpha;
}`;

class Face { constructor(public a: number, public b: number, public c: number) {} }
class Vertex { position = vec3.create(); normal = vec3.create(); uv = vec2.create(); constructor(x: number, y: number, z: number) { this.position = vec3.fromValues(x, y, z); } }
class Geometry {
  vertices: Vertex[] = []; faces: Face[] = [];
  addVertex(...args: number[]) { for (let i = 0; i < args.length; i += 3) this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2])); return this; }
  addFace(...args: number[]) { for (let i = 0; i < args.length; i += 3) this.faces.push(new Face(args[i], args[i + 1], args[i + 2])); return this; }
  get lastVertex() { return this.vertices[this.vertices.length - 1]; }
  subdivide(divisions = 1) {
    const midPointCache: Record<string, number> = {}; let f = this.faces;
    for (let div = 0; div < divisions; ++div) {
      const newFaces: Face[] = new Array(f.length * 4);
      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);
        const i = ndx * 4;
        newFaces[i] = new Face(face.a, mAB, mCA);
        newFaces[i + 1] = new Face(face.b, mBC, mAB);
        newFaces[i + 2] = new Face(face.c, mCA, mBC);
        newFaces[i + 3] = new Face(mAB, mBC, mCA);
      });
      f = newFaces;
    }
    this.faces = f; return this;
  }
  spherize(radius = 1) { this.vertices.forEach((vertex) => { vec3.normalize(vertex.normal, vertex.position); vec3.scale(vertex.position, vertex.normal, radius); }); return this; }
  get data() { return { vertices: new Float32Array(this.vertices.flatMap((v) => Array.from(v.position))), indices: new Uint16Array(this.faces.flatMap((f) => [f.a, f.b, f.c])), uvs: new Float32Array(this.vertices.flatMap((v) => Array.from(v.uv))) }; }
  getMidPoint(ndxA: number, ndxB: number, cache: Record<string, number>) { const key = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`; if (cache[key] !== undefined) return cache[key]; const a = this.vertices[ndxA].position; const b = this.vertices[ndxB].position; const ndx = this.vertices.length; cache[key] = ndx; this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5); return ndx; }
}
class IcosahedronGeometry extends Geometry { constructor() { super(); const t = Math.sqrt(5) * 0.5 + 0.5; this.addVertex(-1,t,0,1,t,0,-1,-t,0,1,-t,0,0,-1,t,0,1,t,0,-1,-t,0,1,-t,t,0,-1,t,0,1,-t,0,-1,-t,0,1).addFace(0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1); } }
class DiscGeometry extends Geometry { constructor(steps = 56, radius = 1) { super(); steps = Math.max(4, steps); const alpha = (2 * Math.PI) / steps; this.addVertex(0,0,0); this.lastVertex.uv[0] = 0.5; this.lastVertex.uv[1] = 0.5; for (let i = 0; i < steps; ++i) { const x = Math.cos(alpha * i); const y = Math.sin(alpha * i); this.addVertex(radius * x, radius * y, 0); this.lastVertex.uv[0] = x * 0.5 + 0.5; this.lastVertex.uv[1] = y * 0.5 + 0.5; if (i > 0) this.addFace(0, i, i + 1);} this.addFace(0, steps, 1);} }

const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader; gl.deleteShader(shader); return null; };
const createProgram = (gl: WebGL2RenderingContext, shaderSources: string[]) => { const program = gl.createProgram()!; [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => { const shader = createShader(gl, type, shaderSources[ndx]); if (shader) gl.attachShader(program, shader); }); gl.linkProgram(program); if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program; gl.deleteProgram(program); return null; };
const makeBuffer = (gl: WebGL2RenderingContext, data: BufferSource, usage: number) => { const buf = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, usage); gl.bindBuffer(gl.ARRAY_BUFFER, null); return buf; };
const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => { const dpr = Math.min(2, window.devicePixelRatio || 1); const w = Math.round(canvas.clientWidth * dpr); const h = Math.round(canvas.clientHeight * dpr); const need = canvas.width !== w || canvas.height !== h; if (need) { canvas.width = w; canvas.height = h; } return need; };

class InfiniteGridMenu {
  TARGET_FRAME_DURATION = 1000 / 60;
  SPHERE_RADIUS = 1.45;
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
  items: MenuItem[];
  onActiveItemChange: (i: number) => void;
  orientation = quat.create();
  pointerRotation = quat.create();
  prevPointer = vec2.create();
  pointer = vec2.create();
  dragging = false;
  smoothRotationVelocity = 0;
  frame = 0;
  raf = 0;
  camera = { position: vec3.fromValues(0, 0, 3), matrix: mat4.create(), view: mat4.create(), projection: mat4.create(), up: vec3.fromValues(0, 1, 0), near: 0.1, far: 40, fov: Math.PI / 4 };

  program: WebGLProgram;
  vao: WebGLVertexArrayObject;
  indexCount = 0;
  instanceCount = 0;
  instanceBuffer: WebGLBuffer;
  instanceData!: Float32Array;
  instanceMatrices: Float32Array[] = [];
  positions: vec3[] = [];
  tex: WebGLTexture;
  atlasSize = 1;

  loc!: Record<string, WebGLUniformLocation | number | null>;

  constructor(canvas: HTMLCanvasElement, items: MenuItem[], onActiveItemChange: (i: number) => void, scale = 1) {
    this.canvas = canvas; this.items = items; this.onActiveItemChange = onActiveItemChange;
    const gl = canvas.getContext("webgl2", { antialias: true, alpha: true });
    if (!gl) throw new Error("WebGL2 unavailable");
    this.gl = gl;
    this.camera.position[2] = 3 * scale;

    this.program = createProgram(gl, [discVertShaderSource, discFragShaderSource])!;
    this.tex = gl.createTexture()!;
    this.instanceBuffer = gl.createBuffer()!;
    this.vao = gl.createVertexArray()!;

    this.init();
  }

  init() {
    const gl = this.gl;
    const disc = new DiscGeometry(56, 1).data;
    const ico = new IcosahedronGeometry();
    ico.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.positions = ico.vertices.map((v) => v.position);
    this.instanceCount = this.positions.length;
    this.indexCount = disc.indices.length;

    const posBuffer = makeBuffer(gl, disc.vertices, gl.STATIC_DRAW);
    const uvBuffer = makeBuffer(gl, disc.uvs, gl.STATIC_DRAW);
    const idxBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, disc.indices, gl.STATIC_DRAW);

    this.loc = {
      aModelPosition: gl.getAttribLocation(this.program, "aModelPosition"),
      aModelUvs: gl.getAttribLocation(this.program, "aModelUvs"),
      aInstanceMatrix: gl.getAttribLocation(this.program, "aInstanceMatrix"),
      uWorldMatrix: gl.getUniformLocation(this.program, "uWorldMatrix"),
      uViewMatrix: gl.getUniformLocation(this.program, "uViewMatrix"),
      uProjectionMatrix: gl.getUniformLocation(this.program, "uProjectionMatrix"),
      uCameraPosition: gl.getUniformLocation(this.program, "uCameraPosition"),
      uRotationAxisVelocity: gl.getUniformLocation(this.program, "uRotationAxisVelocity"),
      uTex: gl.getUniformLocation(this.program, "uTex"),
      uItemCount: gl.getUniformLocation(this.program, "uItemCount"),
      uAtlasSize: gl.getUniformLocation(this.program, "uAtlasSize"),
    };

    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.enableVertexAttribArray(this.loc.aModelPosition as number);
    gl.vertexAttribPointer(this.loc.aModelPosition as number, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.enableVertexAttribArray(this.loc.aModelUvs as number);
    gl.vertexAttribPointer(this.loc.aModelUvs as number, 2, gl.FLOAT, false, 0, 0);

    this.instanceData = new Float32Array(this.instanceCount * 16);
    for (let i = 0; i < this.instanceCount; i += 1) {
      this.instanceMatrices.push(new Float32Array(this.instanceData.buffer, i * 16 * 4, 16));
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.instanceData.byteLength, gl.DYNAMIC_DRAW);
    for (let i = 0; i < 4; i += 1) {
      const l = (this.loc.aInstanceMatrix as number) + i;
      gl.enableVertexAttribArray(l);
      gl.vertexAttribPointer(l, 4, gl.FLOAT, false, 64, i * 16);
      gl.vertexAttribDivisor(l, 1);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
    gl.bindVertexArray(null);

    this.bindPointer();
    this.buildAtlas();
    this.resize();
  }

  bindPointer() {
    this.canvas.style.touchAction = "none";
    this.canvas.addEventListener("pointerdown", (e) => {
      this.dragging = true;
      vec2.set(this.pointer, e.clientX, e.clientY);
      vec2.copy(this.prevPointer, this.pointer);
    });
    window.addEventListener("pointerup", () => { this.dragging = false; });
    this.canvas.addEventListener("pointermove", (e) => { if (this.dragging) vec2.set(this.pointer, e.clientX, e.clientY); });
  }

  async buildAtlas() {
    const gl = this.gl;
    this.atlasSize = Math.ceil(Math.sqrt(Math.max(1, this.items.length)));
    const atlas = document.createElement("canvas");
    const ctx = atlas.getContext("2d");
    if (!ctx) return;
    const cell = 512;
    atlas.width = this.atlasSize * cell;
    atlas.height = this.atlasSize * cell;

    const images = await Promise.all(
      this.items.map((item) => new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
        img.src = item.image;
      }))
    );

    images.forEach((img, i) => {
      const x = (i % this.atlasSize) * cell;
      const y = Math.floor(i / this.atlasSize) * cell;
      ctx.drawImage(img, x, y, cell, cell);
    });

    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
  }

  resize() {
    const gl = this.gl;
    if (resizeCanvasToDisplaySize(this.canvas)) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    const h = this.SPHERE_RADIUS * 0.31;
    const d = this.camera.position[2];
    this.camera.fov = aspect > 1 ? 2 * Math.atan(h / d) : 2 * Math.atan(h / aspect / d);
    mat4.perspective(this.camera.projection, this.camera.fov, aspect, this.camera.near, this.camera.far);
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
    mat4.invert(this.camera.view, this.camera.matrix);
  }

  project(p: vec2) {
    const r = 2;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const s = Math.max(w, h) - 1;
    const x = (2 * p[0] - w - 1) / s;
    const y = (2 * p[1] - h - 1) / s;
    const xySq = x * x + y * y;
    const rSq = r * r;
    const z = xySq <= rSq / 2 ? Math.sqrt(rSq - xySq) : rSq / Math.sqrt(xySq);
    return vec3.fromValues(-x, y, z);
  }

  update(delta: number) {
    const t = delta / (1000 / 60) + 0.00001;
    if (this.dragging) {
      const m = vec2.sub(vec2.create(), this.pointer, this.prevPointer);
      vec2.scale(m, m, 0.3 * t);
      if (vec2.sqrLen(m) > 0.1) {
        vec2.add(m, this.prevPointer, m);
        const p = vec3.normalize(vec3.create(), this.project(m));
        const q = vec3.normalize(vec3.create(), this.project(this.prevPointer));
        vec2.copy(this.prevPointer, m);
        const axis = vec3.cross(vec3.create(), p, q);
        vec3.normalize(axis, axis);
        const d = Math.max(-1, Math.min(1, vec3.dot(p, q)));
        quat.setAxisAngle(this.pointerRotation, axis, Math.acos(d) * (5 / t));
      }
    } else {
      quat.slerp(this.pointerRotation, this.pointerRotation, quat.create(), 0.1 * t);
    }

    this.orientation = quat.multiply(quat.create(), this.pointerRotation, this.orientation);
    quat.normalize(this.orientation, this.orientation);

    const rotated = this.positions.map((p) => vec3.transformQuat(vec3.create(), p, this.orientation));
    const fixedDiscScale = 0.19;
    rotated.forEach((p, i) => {
      const matrix = mat4.create();
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [fixedDiscScale, fixedDiscScale, fixedDiscScale]));
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));
      mat4.copy(this.instanceMatrices[i], matrix);
    });

    const snap = vec3.fromValues(0, 0, -1);
    const inv = quat.conjugate(quat.create(), this.orientation);
    const nt = vec3.transformQuat(vec3.create(), snap, inv);
    let maxDot = -1;
    let nearest = 0;
    for (let i = 0; i < this.positions.length; i += 1) {
      const d = vec3.dot(nt, this.positions[i]);
      if (d > maxDot) { maxDot = d; nearest = i; }
    }
    this.onActiveItemChange(nearest % Math.max(1, this.items.length));

    this.smoothRotationVelocity = Math.min(1, Math.max(0, vec2.distance(this.pointer, this.prevPointer) / 120));

    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.instanceData);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  render() {
    const gl = this.gl;
    gl.useProgram(this.program);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(this.loc.uWorldMatrix as WebGLUniformLocation, false, mat4.create());
    gl.uniformMatrix4fv(this.loc.uViewMatrix as WebGLUniformLocation, false, this.camera.view);
    gl.uniformMatrix4fv(this.loc.uProjectionMatrix as WebGLUniformLocation, false, this.camera.projection);
    gl.uniform3f(this.loc.uCameraPosition as WebGLUniformLocation, this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    gl.uniform4f(this.loc.uRotationAxisVelocity as WebGLUniformLocation, 1, 0, 0, this.smoothRotationVelocity);
    gl.uniform1i(this.loc.uItemCount as WebGLUniformLocation, this.items.length);
    gl.uniform1i(this.loc.uAtlasSize as WebGLUniformLocation, this.atlasSize);

    gl.uniform1i(this.loc.uTex as WebGLUniformLocation, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);

    gl.bindVertexArray(this.vao);
    gl.drawElementsInstanced(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0, this.instanceCount);
  }

  run = (time = 0) => {
    if (!this.frame) this.frame = time;
    const delta = Math.min(32, time - this.frame);
    this.frame = time;
    this.update(delta);
    this.render();
    this.raf = requestAnimationFrame(this.run);
  };

  destroy() {
    cancelAnimationFrame(this.raf);
  }
}

const defaultItems: MenuItem[] = [{ image: "https://picsum.photos/900/900?grayscale", link: "#", title: "", description: "" }];

export default function InfiniteMenu({ items = [], scale = 1, onItemAction }: InfiniteMenuProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeItemRef = useRef<MenuItem | null>(null);
  const downPointRef = useRef<{ x: number; y: number } | null>(null);
  const dragDistanceRef = useRef(0);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let sketch: InfiniteGridMenu | null = null;
    let moveTimer: number | undefined;

    const setActive = (index: number) => {
      const list = items.length ? items : defaultItems;
      const nextItem = list[index % list.length];
      activeItemRef.current = nextItem;
      setActiveItem(nextItem);
      setIsMoving(true);
      if (moveTimer) window.clearTimeout(moveTimer);
      moveTimer = window.setTimeout(() => setIsMoving(false), 120);
    };

    sketch = new InfiniteGridMenu(canvas, items.length ? items : defaultItems, setActive, scale);
    sketch.run();

    const onResize = () => sketch?.resize();
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      if (moveTimer) window.clearTimeout(moveTimer);
      sketch?.destroy();
    };
  }, [items, scale]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        id="infinite-grid-menu-canvas"
        ref={canvasRef}
        onPointerDown={(e) => {
          downPointRef.current = { x: e.clientX, y: e.clientY };
          dragDistanceRef.current = 0;
        }}
        onPointerMove={(e) => {
          if (!downPointRef.current) return;
          const dx = e.clientX - downPointRef.current.x;
          const dy = e.clientY - downPointRef.current.y;
          dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.hypot(dx, dy));
        }}
        onPointerUp={() => {
          if (dragDistanceRef.current < 7 && activeItemRef.current) {
            onItemAction?.(activeItemRef.current);
          }
          downPointRef.current = null;
          dragDistanceRef.current = 0;
        }}
      />

      {activeItem && (
        <>
          <h2 className={`infinite-face-title ${isMoving ? "inactive" : "active"}`}>{activeItem.title}</h2>
          <p className={`infinite-face-description ${isMoving ? "inactive" : "active"}`}>{activeItem.description}</p>
          <button
            type="button"
            onClick={() => onItemAction?.(activeItem)}
            className={`infinite-action-button ${isMoving ? "inactive" : "active"}`}
            aria-label={`Open ${activeItem.title} details`}
          >
            ↗
          </button>
        </>
      )}
    </div>
  );
}
