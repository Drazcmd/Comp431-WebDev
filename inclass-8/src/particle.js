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
    let naive_position = position.forEach(function (dimension, index) {
        //apply velocity changes
        return dimension + (delta  * velocity[index])
    })
    const updated_particle = particle({
        acceleration:acceleration,
        position:naive_position,
        velocity:velocity,
        mass:mass
    })
    return updated_particle
}

export default particle

export { update }
