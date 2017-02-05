const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
    //Shadowing. Can't figure out a way to do this non-mutationally - trying to
    //pass anything not named "position" into the constructor is a recipe for disaster
    //due to how the constructor is written. And I'm assuming we shouldn't be editing
    //the constructor code...
    let new_position = position.map(function (dimension, index) {
        //apply velocity and acceleration changes
        //for the v_i * t part
        let veloc_piece = delta * velocity[index];

        //for the 1/2 * a * t^2 part
        let accel_piece = (1.0/2.0) * acceleration[index] * delta * delta;

        let calculation_result = dimension + veloc_piece + accel_piece

        if (!canvas) {
            //If we don't get the canvas, can't do bound checking on the large end nor
            //can we wrap around on the small end. So I'm just gonna let it go out of bounds
            return calculation_result     
        } else {
            //We know for sure we have a canvas, and it could be out of bounds on either end
            let boundry = (index==0 ? canvas["width"] : canvas["height"])
            if (calculation_result < 0) {
                return boundry + calculation_result
            }
            else if (calculation_result > boundry){
                return calculation_result - boundry 
            } else {
                return calculation_result
            }
        }
    })
    let new_velocity = velocity.map(function (dimension, index) {
        //apply velocity and acceleration changes
        return dimension + (acceleration[index] * delta)
    })
    const updated_particle = particle({
        acceleration,
        position: new_position,
        velocity: new_velocity,
        mass
    })
    return updated_particle
}

export default particle

export { update }
