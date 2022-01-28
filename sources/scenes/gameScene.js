import camera from 'decs/Components/camera';
import resizeHandler from '../onDispose/resizeHandler';
import playerEntity from '../entities/playerEntity';
import strawberry from '../entities/strawberry';
import blueberry from '../entities/blueberry';
import meshRenderer from 'decs/systems/meshRenderer';
import calculateTransforms from 'decs/systems/calculateTransforms';

export default (decs, canvas, gl) => {
    const scene = decs.createScene();
    scene.addComponent(scene.createEntity(), {
	camera: camera(),
    });

    playerEntity(scene, [0, 0, -1], [0, 0, 0], [16, 16, 1]);
    strawberry(scene, [64, 0, -1], [0, 0, 0], [16, 16, 1]);
    blueberry(scene, [-64, 0, -1], [0, 0, 0], [16, 16, 1]);
    scene.addSystem(meshRenderer);
    scene.addSystem(calculateTransforms);

    scene.update(0);
    scene.executeOnDispose(resizeHandler(scene, canvas, gl));
    return scene;
};
