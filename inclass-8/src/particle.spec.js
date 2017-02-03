import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok

        // IMPLEMENT ME:
        //   check position, velocity, acceleration, mass
        //   these should all be numbers or arrays of numbers
        expect(p.position).to.be.ok.and.to.be.a('array')
        expect(p.velocity).to.be.ok.and.to.be.a('array')
        expect(p.acceleration).to.be.ok.and.to.be.a('array')
        expect(p.mass).to.be.ok.and.to.be.a('number')
    })
    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })
    it('should update the velocity by the acceleration', () => {
        // IMPLEMENT ME:
        //    similar to the previous check
        //    check that the velocity is updated correctly
        const p = particle({ position: [1, 1], velocity: [1, 1], acceleration:[0.5, -0.5] })
        const {position, velocity, acceleration} = update(p, 2.0)
        expect(position).to.be.ok
        expect(acceleration).to.be.ok.and.to.eql([0.5, -0.5])
        expect(velocity).to.eql([2.0, 0.0])
    })

    it('particles should wrap around the world', () => {
        // IMPLEMENT ME:
        
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides

        // you will want to send the canvas into the update function
        // this means you decide the size of the canvas here.
        // canvas = { width, height }
        const canvas = {width:10, height:10}

        const p1 =  particle({ position: [1, -0.5],velocity:[0,0], acceleration: [0, 0]})
        const { position } = update(p1, 1.0, canvas) 
        expect(position).to.be.ok
        expect(position).to.eql([1.0, 9.5])

        //We can only get away with doing the shorthand {position} for accessing
        //the returned object.position once because we don't allow mutation, and creating
        //it more than once in the same scope would cause a name conflict
        const p2 = particle({ position: [1, 10.5], velocity:[0,0], acceleration: [0, 0]})
        const p2state = update(p2, 1.0, canvas) 
        expect(p2state.position).is.ok.and.to.eql([1.0, 0.5])

        const p3 = particle({ position: [-0.5, 1],velocity:[0,0], acceleration: [0, 0]})
        const p3state = update(p3, 1.0, canvas) 
        expect(p3state.position).is.ok.and.to.eql([9.5, 1.0])

        const p4 =  particle({ position: [10.5, 1],velocity:[0,0], acceleration: [0, 0]})
        const p4state = update(p4, 1.0, canvas) 
        expect(p4state.position).is.ok.and.to.eql([0.5, 1.0])


        expect()
    })

})
