import * as THREE from '../../../lib/three.module.js'

THREE.Object3D.prototype.updateMatrix = function () {

    this.matrix.compose( this.position, this.quaternion, this.scale )

    var pivot = this.pivot

    if ( pivot != null ) {

      var px = pivot.x, py = pivot.y,  pz = pivot.z
      var te = this.matrix.elements

      te[ 12 ] += px - te[ 0 ] * px - te[ 4 ] * py - te[ 8 ] * pz
      te[ 13 ] += py - te[ 1 ] * px - te[ 5 ] * py - te[ 9 ] * pz
      te[ 14 ] += pz - te[ 2 ] * px - te[ 6 ] * py - te[ 10 ] * pz

    }

    this.matrixWorldNeedsUpdate = true

}

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

            mesh.position.x = 500
            mesh.pivot = new THREE.Vector3(-500, 0, 0)

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
        const mesh = this.local.children[0]
        mesh.rotation.y += 0.01
    }
}