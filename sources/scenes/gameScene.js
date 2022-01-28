import camera from 'decs/Components/camera';
import resizeHandler from '../onDispose/resizeHandler';

export default (decs, canvas, gl) => {
    const scene = decs.createScene();
    scene.addComponent(scene.createEntity(), {
	camera: camera(),
    });

    scene.executeOnDispose(resizeHandler(scene, canvas, gl));
    return scene;
};
