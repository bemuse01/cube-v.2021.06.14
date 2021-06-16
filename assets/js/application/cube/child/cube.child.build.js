import * as THREE from '../../../lib/three.module.js'

export default class{
    constructor({group}){
        this.init()
        this.create()
        this.add(group)
    }


    // init
    init(){
        this.param = {
            size: 100,
            gap: 25,
            count: 3,
            color: 'white',

        }

        this.position = []
        this.cube = []
        this.degree = 0
    }


    // add
    add(group){
        group.add(this.local)
    }


    // create
    create(){
        this.local = new THREE.Group()

        // for(let i = 0; i < this.param.count ** this.param.count; i++){
        for(let i = 0; i < 1; i++){
            const mesh = this.createMesh()

            mesh.position.x = 200

            this.local.add(mesh)
        }
    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        return new THREE.Mesh(geometry, material)
    }
    createGeometry(){
        return new THREE.BoxGeometry(this.param.size, this.param.size, this.param.size)
    }
    createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: this.param.color,
            transparent: true,
            wireframe: true
        })
    }


    // animate
    animate(){

    }
}