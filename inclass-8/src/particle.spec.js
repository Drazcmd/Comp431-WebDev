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
        const { position } = update(p, 2.0) // dt is different here
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
        const canvas = [10, 10]

        const p1 =  particle({ position: [1, -0.5]})
        update(p1, canvas)
        const { pos1 } = update(p, 1.0, canvas) 
        expect(pos1).to.eql([1.0, 0.0])

        const p2 =  particle({ position: [1, 10.5]})
        update(p2, canvas)
        const { pos2 } = update(p, 1.0, canvas) 
        expect(pos2).to.eql([1.0, 10.0])

        const p3 =  particle({ position: [-0.5, 1]})
        update(p3, canvas)
        const { pos3 } = update(p, 1.0, canvas) 
        expect(pos3).to.eql([0.0, 1.0])

        const p4 =  particle({ position: [10.5, 1]})
        update(p4, canvas)
        const { pos4 } = update(p, 1.0, canvas) 
        expect(pos4).to.eql([10.0, 1.0])


        expect()
    })

})
