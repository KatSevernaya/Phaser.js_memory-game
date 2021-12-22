class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');  // передача параметров в базовый класс
        this.scene = scene;
        this.value = value;
        this.setOrigin(0.5, 0.5);
        this.opened = false
        this.scene.add.existing(this);  // чтобы добавить спрайт на экран
        this.setInteractive(); // установить флаг, что данный объект необъодимо отслеивать для взаимодествия, и для него нужно отслеживать все события метода on
        // this.on('pointerdown', this.open, this)
        // this.hide();
    }

    open(callback) {
        this.opened = true;
        this.flip(callback);
    }
    close() {
        if (this.opened === true) {
            this.flip();
            this.opened = false;
        }
        
    }
    flip(callback) {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 200,
            onComplete: () => {
                this.show(callback);
            }
        })
    }
    show(callback) {
        let texture = this.opened ? 'card' + this.value : 'card'
        this.setTexture(texture);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            ease: 'Linear',
            duration: 200,
            onComplete: () => {
                if (callback) {
                    callback();
                }
            }
            
        })
    }
    init(position) {
        this.position = position;
        this.close();
        this.setPosition(-this.width, -this.height)
    }
    move(params) {
        // console.log(this.scene.tweens)
        this.scene.tweens.add({
            targets: this,
            x: params.x,
            y: params.y,
            delay: params.delay,
            ease: 'Linear',
            duration: 250,
            onComplete: () => {
                if (params.callback) {
                    params.callback()
                }
            }
        })
    }
}