// Range Engine WGSL Shading Kernel for WebGPU
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
  @location(1) normal: vec3f,
};

struct SceneUniforms {
  time: f32,
  exposure: f32,
  roughness: f32,
  metallic: f32,
};

@group(0) @binding(0) var<uniform> scene: SceneUniforms;

@vertex
fn vs_main(@location(0) position: vec3f, @location(1) normal: vec3f, @location(2) uv: vec2f) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4f(position, 1.0);
  output.uv = uv;
  output.normal = normal;
  return output;
}

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4f {
  let lightDir = normalize(vec3f(0.5, 1.0, 0.8));
  let diff = max(dot(input.normal, lightDir), 0.15);
  let rangeRed = vec3f(1.0, 0.102, 0.102);
  let finalColor = rangeRed * diff * scene.exposure;
  return vec4f(finalColor, 1.0);
}
