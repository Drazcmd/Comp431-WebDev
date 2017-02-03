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
    const naive_position = position.map(function (dimension, index) {
        //apply velocity changes
        return dimension + (delta  * velocity[index])
    })
    /* Why doesn't this work?
    const updated_particle = particle({
        acceleration,
        naive_position,
        velocity,
        mass
    })
    //updated_particle.position = naive_position
    */
    var updated_particle = particle({
        acceleration,
        position,
        velocity,
        mass
    })
    updated_particle.position = naive_position
    return updated_particle
}

export default particle

export { update }
