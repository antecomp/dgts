import * as PIXI from 'pixi.js'
import athena_image from '@/assets/athena_cutout.png'
import single_border from '@/assets/sngle9pr.png'
import exbg from '@/assets/exbg.png'

const app = new PIXI.Application();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.__PIXI_APP__ = app; // Used For PixiJS Inspect Element (ts ignore above to make linter happy.)


interface Dimension {
  width: number,
  height: number,
  padding?: {top: number, left: number}
}

interface Dimensions {
  [key: string]: Dimension
}

const DIMENSIONS: Dimensions = {
  app: {
    width: 1208,
    height: 755,
    padding: {
      top: 3,
      left: 3
    }
  },
  sidebar: {
    width: 256,
    height: 749
  },
  bottombar: {
    width: 940,
    height: 81
  },
  main: {
    width: 943,
    height: 663
  }
}




const init = async () => {
  await app.init({...DIMENSIONS.app, background: "#000000"});

  PIXI.Assets.add({alias: 'athena', src: athena_image})
  await PIXI.Assets.load('athena');
  let sprite = PIXI.Sprite.from('athena');


  // Build UI
  const sidebarContainer = new PIXI.Container();
  const bottombarContainer = new PIXI.Container();
  const mainContainer = new PIXI.Container();

  sidebarContainer.position.set(DIMENSIONS.app.padding?.top, DIMENSIONS.app.padding?.left);

  bottombarContainer.position.set(DIMENSIONS.sidebar.width + DIMENSIONS.app.padding!.left, DIMENSIONS.app.height - DIMENSIONS.bottombar.height - DIMENSIONS.app.padding!.top);
  mainContainer.position.set(DIMENSIONS.sidebar.width + DIMENSIONS.app.padding!.left, 0);
  
  app.stage.addChild(sidebarContainer);
  app.stage.addChild(bottombarContainer);
  app.stage.addChild(mainContainer);


  await PIXI.Assets.load(single_border);
  const makeSingleBorder = (dim: Dimension): PIXI.NineSliceSprite  => {
    return new PIXI.NineSliceSprite({texture: PIXI.Texture.from(single_border), ...dim}) // Defaults to tiling evenly, otherwise needs leftWidth: topHeight... etc.
  } 

  const sidebarBorder = makeSingleBorder(DIMENSIONS.sidebar);
  sidebarContainer.addChild(sidebarBorder);

  const bottombarBorder = makeSingleBorder(DIMENSIONS.bottombar);
  bottombarContainer.addChild(bottombarBorder);


  



  document.body.appendChild(app.canvas);
}

init();