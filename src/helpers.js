
function updateOrientation() {
    _game.player.rotationRadians = new THREE.Euler().setFromQuaternion(_game.player.rigidBody.quaternion);

    _game.player.rotationAngleX = Math.round(window.game.helpers.radToDeg(_game.player.rotationRadians.x));
    _game.player.rotationAngleY = Math.round(window.game.helpers.radToDeg(_game.player.rotationRadians.y));

    if ((_cannon.getCollisions(_game.player.rigidBody.index) &&
        ((_game.player.rotationAngleX >= 90) ||
            (_game.player.rotationAngleX <= -90) ||
            (_game.player.rotationAngleY >= 90) ||
            (_game.player.rotationAngleY <= -90)))
    )
    {
        _game.player.rigidBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), _game.player.rotationRadians.z);
    }
}