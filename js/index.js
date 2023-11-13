var world = Physics();

Physics(function(world) {

  var viewWidth = 500;
  var viewHeight = 300;

  var renderer = Physics.renderer('canvas', {
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: false,
    styles: {
      'circle': {
        strokeStyle: '#f00',
        lineWidth: 1,
        fillStyle: '#f00',
        angleIndicator: '#fff'
      }
    }
  });

  world.add(renderer);
  world.on('step', function () {
    world.render();
  });

  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  world.add(Physics.behavior('edge-collision-detection', {
    aabb: viewportBounds,
    restitution: 0.99,
    cof: 0.99
  }));

  world.add(
    Physics.body('circle', {
      x: 50,
      y: 30,
      vx: 0.2,
      vy: 0.01,
      radius: 20
    })
  );

  world.add(Physics.behavior('body-impulse-response'));
  world.add(Physics.behavior('constant-acceleration'));

  Physics.util.ticker.on(function(time, dt) {
    world.step(time);
  });

  Physics.util.ticker.start();
  
});