import * as PIXI from 'pixi.js'
import athena_image from '@/assets/athena_cutout.png'

const app = new PIXI.Application();

const init = async () => {
  await app.init({width: 1208, height: 755, background: "#000000"});
  document.body.appendChild(app.canvas);

  PIXI.Assets.add({alias: 'athena', src: athena_image})
  await PIXI.Assets.load('athena');
  let sprite = PIXI.Sprite.from('athena');

  /* PIXI.Assets.addBundle('test',{
    'athena': athena_image,
  });

  const assets = await PIXI.Assets.loadBundle('test');
  console.log(assets);
  await PIXI.Assets.load('athena');
  let sprite = PIXI.Sprite.from('athena');
  app.stage.addChild(sprite); */


  // This also works
  //const cum = await PIXI.Assets.load(athena_image);
  //let sprite = PIXI.Sprite.from(cum);
  
  app.stage.addChild(sprite);

  let elapsed = 0.0;
  app.ticker.add((ticker) => {
    elapsed += ticker.deltaTime;
    sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
  })
}

init();