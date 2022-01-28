export default (scene, dt) => {
    scene.query(['aggro', 'position'],({ aggro , position : aggroObjectPos }, id) => {
        scene.query(['position'],({ position}) => {
        let v1 = position[0] - aggroObjectPos[0];
        let v2 = position[1] - aggroObjectPos[1];
        let distance = Math.sqrt((v1 * v1) + (v2 * v2));
        
        if(distance <= aggro.distance) {
            scene.removeComponent(id, ['aggro']);
            console.log("aggro distance reached");
            //Add component with specific action, when in range of the player.
        }
        }, ['active', ...aggro.target]);
    }, ['active']);
}