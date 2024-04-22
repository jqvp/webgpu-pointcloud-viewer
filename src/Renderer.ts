export class Renderer {
  device: GPUDevice;
  private adapter: GPUAdapter;

  private constructor() {
  }

  private async init() {
    const adapter = await navigator.gpu?.requestAdapter();

    if(adapter === null) throw new Error('Your browser does not support WegGPU');

    this.adapter = adapter;
  }

  private async makeDevice() {
    this.device = await this.adapter.requestDevice();

    this.device.lost.then(async info => {
      if(info.reason === 'destroyed') return;
      await this.makeDevice();
    });
  }

  static async new(): Promise<Renderer> {
    const renderer = new Renderer();
    await renderer.init();

    return renderer;
  }
}
