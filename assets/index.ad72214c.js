import{P as e,W as t}from"./vendor.59cd0ed1.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(s){const a=new URL(e,location),i=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((s,r)=>{const h=new URL(e,a);if(self[t].moduleMap[h])return s(self[t].moduleMap[h]);const l=new Blob([`import * as m from '${h}';`,`${t}.moduleMap['${h}']=m;`],{type:"text/javascript"}),n=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){r(new Error(`Failed to import: ${e}`)),i(n)},onload(){s(self[t].moduleMap[h]),i(n)}});document.head.appendChild(n)})),self[t].moduleMap={}}}("assets/");class s extends e.Scene{constructor(){super("preloader")}preload(){this.load.image("map-background","assets/img/map_background.png"),this.load.image("pond","assets/img/pond.png"),this.load.image("lights","assets/img/lights.png"),this.load.image("signs","assets/img/signs.png"),this.load.image("blank_blockers","assets/img/blank_square.png"),this.load.image("vendingMachine1","assets/img/vendingMachine1.png"),this.load.image("vendingMachine2","assets/img/vendingMachine2.png"),this.load.image("truck1","assets/img/truck1.png"),this.load.image("truck2","assets/img/truck2.png"),this.load.image("barrels","assets/img/barrels.png"),this.load.image("barrelShadow","assets/img/barrelShadow.png"),this.load.image("bullet","assets/img/bullet.png"),this.load.image("vignetting","assets/img/UI/vignetting.png"),this.load.image("radiation_1","assets/img/UI/radiation_1.png"),this.load.image("radiation_2","assets/img/UI/radiation_2.png"),this.load.image("ammoIcon","assets/img/UI/ammo_icon.png"),this.load.image("rtIcon","assets/img/UI/rt_icon.png"),this.load.image("death","assets/img/UI/death.png"),this.load.image("end_screen","assets/img/UI/end_screen.png"),this.load.image("muzzle_flash","assets/img/muzzle_flash.png"),this.load.atlas("float_wood","assets/img/floatWood/float_wood.png","assets/img/floatWood/float_wood.json"),this.load.atlas("grass_dark","assets/img/grass_dark.png","assets/img/grass_dark.json"),this.load.atlas("grass_light","assets/img/grass_light.png","assets/img/grass_light.json"),this.load.image("rabbit","assets/img/rabbit.png"),this.load.image("rabbit-back","assets/img/rabbit_back.png"),this.load.atlas("back-left-idle","assets/img/player/back_left_idle.png","assets/img/player/back_left_idle.json"),this.load.atlas("back-left-walk","assets/img/player/back_left_walk.png","assets/img/player/back_left_walk.json"),this.load.atlas("revolver-front-left-idle","assets/img/player/revolver/revolver_front_left_idle.png","assets/img/player/revolver/revolver_front_left_idle.json"),this.load.atlas("revolver-front-left-walk","assets/img/player/revolver/revolver_front_left_walk.png","assets/img/player/revolver/revolver_front_left_walk.json"),this.load.audio("game_bgm",["assets/audio/game_bgm.mp3"]),this.load.audio("revolver_sound",["assets/audio/revolver.mp3"]),this.load.audio("hit_body_1",["assets/audio/hit_body_1.mp3"]),this.load.audio("hit_body_2",["assets/audio/hit_body_2.mp3"]),this.load.audio("hit_body_3",["assets/audio/hit_body_3.mp3"]),this.load.audio("wounded",["assets/audio/wounded.mp3"])}create(){this.scene.start("level-1"),this.scene.start("UI")}}class a extends e.Physics.Arcade.Sprite{constructor(t,s,a){super(t,s,a,"revolver-left"),this.speed=220,this.isInvincible=!1,this.play("revolver-left-idle"),t.add.existing(this),t.physics.add.existing(this),this.setCollideWorldBounds(!0),this.cursors=this.scene.input.keyboard.addKeys({up:e.Input.Keyboard.KeyCodes.W,down:e.Input.Keyboard.KeyCodes.S,left:e.Input.Keyboard.KeyCodes.A,right:e.Input.Keyboard.KeyCodes.D})}preUpdate(e,t){super.preUpdate(e,t),this.checkFacingDirection(),this.cursors.left.isDown||this.cursors.right.isDown||this.cursors.up.isDown||this.cursors.down.isDown||(this.setVelocity(0),this.revolverIdle()),this.cursors.left.isDown?(this.setVelocityX(-this.speed),this.revolverWalk()):this.cursors.right.isDown&&(this.setVelocityX(this.speed),this.revolverWalk()),this.cursors.up.isDown?(this.setVelocityY(-this.speed),this.revolverWalk()):this.cursors.down.isDown&&(this.setVelocityY(this.speed),this.revolverWalk())}checkFacingDirection(){this.scene.input.activePointer.y+this.scene.cameras.main.scrollY<this.y&&(this.scene.input.activePointer.x+this.scene.cameras.main.scrollX<=this.x?this.facingDirection="back left":this.facingDirection="back right"),this.scene.input.activePointer.y+this.scene.cameras.main.scrollY>=this.y&&(this.scene.input.activePointer.x+this.scene.cameras.main.scrollX<=this.x?this.facingDirection="front left":this.facingDirection="front right")}revolverIdle(){switch(this.facingDirection){case"back left":this.play("back-left-idle",!0),this.flipX=!1;break;case"back right":this.play("back-left-idle",!0),this.flipX=!0;break;case"front left":this.play("revolver-left-idle",!0),this.flipX=!1;break;case"front right":this.play("revolver-left-idle",!0),this.flipX=!0;break;default:this.play("revolver-left-idle",!0),this.flipX=!1}}revolverWalk(){switch(this.facingDirection){case"back left":this.play("back-left-walk",!0),this.flipX=!1;break;case"back right":this.play("back-left-walk",!0),this.flipX=!0;break;case"front left":this.play("revolver-left-walk",!0),this.flipX=!1;break;case"front right":this.play("revolver-left-walk",!0),this.flipX=!0;break;default:this.play("revolver-left-walk",!0),this.flipX=!1}}}class i extends e.Physics.Arcade.Sprite{constructor(t,s,a,i){super(t,s,a,i),this.speed=200,this.hp=50,this.player=this.scene.player,t.add.existing(this),t.physics.add.existing(this),this.scene.physics.add.overlap(this,this.scene.weapon.bullets,this.shot,null,this);let r=e.Math.RND.pick(["hit_body_1","hit_body_2","hit_body_3"]);this.hitBodySound=this.scene.sound.add(r,{volume:.3})}preUpdate(e,t){super.preUpdate(e,t),this.scene.physics.moveToObject(this,this.player,this.speed),this.facePlayer()}facePlayer(){this.y>this.player.y&&(this.x<=this.player.x?(this.setTexture("rabbit-back"),this.flipX=!0):(this.setTexture("rabbit-back"),this.flipX=!1)),this.y<=this.player.y&&(this.x<=this.player.x?(this.setTexture("rabbit"),this.flipX=!0):(this.setTexture("rabbit"),this.flipX=!1))}shot(e,t){t.destroy(),e.hp-=20,this.hitBodySound.play(),e.hp<=0&&e.destroy()}}class r extends e.Scene{constructor(){super("level-1"),this.rt=0,this.damage=20,this.shootControl=!1,this.weaponType=1,this.canShoot=!0,this.firingRate=500}preload(){}create(){var e;this.plugins.installScenePlugin("WeaponPlugin",t,"weapons",this),(e=this.anims).create({key:"revolver-left-idle",frames:e.generateFrameNames("revolver-front-left-idle",{start:0,end:17,zeroPad:2,prefix:"revolver_front_left_idle_",suffix:".png"}),frameRate:25,repeat:-1}),e.create({key:"back-left-idle",frames:e.generateFrameNames("back-left-idle",{start:0,end:17,zeroPad:2,prefix:"back_left_idle_",suffix:".png"}),frameRate:25,repeat:-1}),e.create({key:"back-left-walk",frames:e.generateFrameNames("back-left-walk",{start:0,end:11,zeroPad:2,prefix:"back_left_walk_",suffix:".png"}),frameRate:25,repeat:-1}),e.create({key:"revolver-left-walk",frames:e.generateFrameNames("revolver-front-left-walk",{start:0,end:9,zeroPad:2,prefix:"revolver_left_walk_",suffix:".png"}),frameRate:25,repeat:-1}),function(e){e.create({key:"float_wood",frames:e.generateFrameNames("float_wood",{start:0,end:69,zeroPad:2,prefix:"floating_wood_",suffix:".png"}),frameRate:25,repeat:-1}),e.create({key:"grass_dark",frames:e.generateFrameNames("grass_dark",{start:0,end:25,zeroPad:2,prefix:"grass_dark_",suffix:".png"}),frameRate:25,repeat:-1}),e.create({key:"grass_light",frames:e.generateFrameNames("grass_light",{start:0,end:25,zeroPad:2,prefix:"grass_light_",suffix:".png"}),frameRate:25,repeat:-1})}(this.anims),this.cameras.main.setBounds(0,0,2308,1478),this.physics.world.setBounds(0,0,2308,1478),this.sound.pauseOnBlur=!1,this.gameBgm=this.sound.add("game_bgm",{volume:.3}),this.gameBgm.play(),this.revolverSound=this.sound.add("revolver_sound",{volume:.5}),this.woundedSound=this.sound.add("wounded",{volume:.3});let s=this.add.graphics();s.fillGradientStyle(12561272,12561272,10982759,10982759,1),s.fillRect(-200,-200,2708,1878),this.pond=this.physics.add.image(1155,742,"pond"),this.pond.setImmovable(!0),this.blank_blockers=this.physics.add.staticGroup(),this.vendingMachineBlocker=this.blank_blockers.create(1533,920,"blank_blockers").setScale(3.18,1).refreshBody(),this.truckBlocker=this.blank_blockers.create(2076,273,"blank_blockers").setScale(5.16,1).refreshBody(),this.createGrass(),this.signs=this.physics.add.image(673,571,"signs"),this.signs.setImmovable(!0),this.vendingMachine2=this.physics.add.image(1533,920,"vendingMachine2"),this.vendingMachine2.setImmovable(!0),this.truck2=this.physics.add.image(2076,299,"truck2"),this.truck2.setImmovable(!0),this.barrelShadow=this.physics.add.image(260,180,"barrelShadow"),this.barrelShadow.setImmovable(!0),this.barrels=this.physics.add.image(281,69,"barrels"),this.barrels.setImmovable(!0),this.floatWood=this.physics.add.sprite(1280,676,"float-wood"),this.player=new a(this,400,300),this.rabbits=this.physics.add.group({classType:i,maxSize:15,runChildUpdate:!0}),this.physics.add.collider(this.rabbits,this.rabbits),this.time.addEvent({delay:1e3,callback:this.newRabbit,callbackScope:this,loop:!0}),this.physics.add.collider(this.player,this.rabbits,this.bitten,null,this),this.physics.add.collider(this.rabbits,this.pond),this.physics.add.collider(this.rabbits,this.blank_blockers),this.physics.add.collider(this.rabbits,this.barrels),this.vendingMachine1=this.physics.add.image(1533,920,"vendingMachine1"),this.vendingMachine1.setImmovable(!0),this.truck1=this.physics.add.image(2076,299,"truck1"),this.truck1.setImmovable(!0),this.physics.add.collider(this.player,this.pond),this.physics.add.collider(this.player,this.blank_blockers),this.physics.add.collider(this.player,this.barrels),this.cameras.main.startFollow(this.player,!0,.05,.05),this.mouseInput=this.input,this.mouse=this.input.mousePointer,this.weapon=this.add.weapon(30,"bullet"),this.weapon.debugPhysics=!0,this.weapon.bulletSpeed=1200,this.weapon.fireRate=this.firingRate,this.weapon.trackSprite(this.player),this.weapon.bulletAngleVariance=2,this.muzzleFlash=this.physics.add.image(400,300,"muzzle_flash")}update(){this.floatWood.play("float_wood",!0),this.player.checkFacingDirection();let t=e.Math.Angle.Between(this.player.x,this.player.y,this.mouseInput.x,this.mouseInput.y);this.muzzleFlash.setAlpha(0),this.muzzleFlash.y=this.player.y+6,"back left"==this.player.facingDirection||"front left"==this.player.facingDirection?(this.muzzleFlash.x=this.player.x-48,this.muzzleFlash.flipX=!1):(this.muzzleFlash.x=this.player.x+48,this.muzzleFlash.flipX=!0),this.mouse.isDown&&(this.weapon.bulletAngleOffset=t+180,this.weapon.fireAtXY(this.input.activePointer.x+this.cameras.main.scrollX,this.input.activePointer.y+this.cameras.main.scrollY),this.canShoot&&this.gunshot())}createGrass(){const e={key:"grass_dark",frame:"grass_dark_00.png",x:{randInt:[0,700]},y:{randInt:[0,1478]},scale:{randFloat:[.4,.8]},alpha:{randFloat:[.4,1]},anims:{key:"grass_dark",repeat:-1,repeatDelay:{randInt:[500,2e3]},delayedPlay:function(){return 1e3*Math.random()}}},t={key:"grass_light",frame:"grass_light_00.png",x:{randInt:[0,700]},y:{randInt:[0,1478]},scale:{randFloat:[.4,.8]},alpha:{randFloat:[.4,1]},anims:{key:"grass_light",repeat:-1,repeatDelay:{randInt:[500,2e3]},delayedPlay:function(){return 1e3*Math.random()}}},s={key:"grass_dark",frame:"grass_dark_00.png",x:{randInt:[700,1426]},y:{randInt:[0,460]},scale:{randFloat:[.4,.8]},alpha:{randFloat:[.4,1]},anims:{key:"grass_dark",repeat:-1,repeatDelay:{randInt:[500,2e3]},delayedPlay:function(){return 1e3*Math.random()}}},a={key:"grass_light",frame:"grass_light_00.png",x:{randInt:[700,1426]},y:{randInt:[0,460]},scale:{randFloat:[.4,.8]},alpha:{randFloat:[.4,1]},anims:{key:"grass_light",repeat:-1,repeatDelay:{randInt:[500,2e3]},delayedPlay:function(){return 1e3*Math.random()}}},i={key:"grass_dark",frame:"grass_dark_00.png",x:{randInt:[700,1426]},y:{randInt:[996,1478]},scale:{randFloat:[.4,.8]},alpha:{randFloat:[.4,1]},anims:{key:"grass_dark",repeat:-1,repeatDelay:{randInt:[500,2e3]},delayedPlay:function(){return 1e3*Math.random()}}},r={key:"grass_light",frame:"grass_light_00.png",x:{randInt:[700,1426]},y:{randInt:[996,1478]},scale:{randFloat:[.4,.8]},alpha:{randFloat:[.4,1]},anims:{key:"grass_light",repeat:-1,repeatDelay:{randInt:[500,2e3]},delayedPlay:function(){return 1e3*Math.random()}}},h={key:"grass_dark",frame:"grass_dark_00.png",x:{randInt:[1600,2308]},y:{randInt:[0,1478]},scale:{randFloat:[.4,.8]},alpha:{randFloat:[.4,1]},anims:{key:"grass_dark",repeat:-1,repeatDelay:{randInt:[500,2e3]},delayedPlay:function(){return 1e3*Math.random()}}},l={key:"grass_light",frame:"grass_light_00.png",x:{randInt:[1600,2308]},y:{randInt:[0,1478]},scale:{randFloat:[.4,.8]},alpha:{randFloat:[.4,1]},anims:{key:"grass_light",repeat:-1,repeatDelay:{randInt:[500,2e3]},delayedPlay:function(){return 1e3*Math.random()}}};for(let n=0;n<5;n++)this.make.sprite(e),this.make.sprite(t),this.make.sprite(h),this.make.sprite(l);for(let n=0;n<3;n++)this.make.sprite(s),this.make.sprite(a),this.make.sprite(i),this.make.sprite(r)}isNotInvincible(){this.player.isInvincible=!1}bitten(){!this.player.isInvincible&&this.rt<100&&(this.rt+=this.damage,this.cameras.main.shake(300,.01),this.woundedSound.play(),this.player.isInvincible=!0,this.time.addEvent({delay:2e3,callback:this.isNotInvincible,callbackScope:this,loop:!1}))}newRabbit(){let t=e.Math.RND.pick(["left","right","top","bottom"]);"left"==t||"right"==t?(this.rabbits.create(e.Math.RND.pick([-37,2345]),e.Math.Between(-58,1536),"rabbit"),this.vendingMachine1.destroy(),this.vendingMachine1=this.physics.add.image(1533,920,"vendingMachine1"),this.vendingMachine1.setImmovable(!0),this.truck1.destroy(),this.truck1=this.physics.add.image(2076,299,"truck1"),this.truck1.setImmovable(!0)):(this.rabbits.create(e.Math.Between(-37,2345),e.Math.RND.pick([-58,206]),"rabbit"),this.vendingMachine1.destroy(),this.vendingMachine1=this.physics.add.image(1533,920,"vendingMachine1"),this.vendingMachine1.setImmovable(!0),this.truck1.destroy(),this.truck1=this.physics.add.image(2076,299,"truck1"),this.truck1.setImmovable(!0))}restoreCanShoot(){this.canShoot=!0}gunshot(){this.canShoot&&(this.cameras.main.shake(60,.002),this.revolverSound.play(),this.muzzleFlash.setAlpha(1),this.canShoot=!1,this.time.addEvent({delay:this.firingRate,callback:this.restoreCanShoot,callbackScope:this,loop:!1}))}}class h extends e.Scene{constructor(){super("UI"),this.haveRadiation1=!1,this.haveRadiation2=!1}preload(){}create(){this.currentLevel=this.scene.get("level-1"),this.rt=this.currentLevel.rt,this.sunshine=this.physics.add.image(1500,443,"lights"),this.sunshine.setAlpha(.7),this.vignetting=this.physics.add.image(0,0,"vignetting").setOrigin(0),this.input.setDefaultCursor("url(assets/img/UI/aim.png), pointer"),this.makeBarBackground(850,936,280,46,6,12112323,8),this.ammoBar=this.makeBar(850,936,280,46,6,9677468,8),this.physics.add.image(820,966,"ammoIcon").scale=.7,this.ammoText=this.add.text(880,886,"REVOLVER",{fontFamily:"Staatliches",fontSize:"40px",align:"center"}),this.weaponLevel=this.add.text(900+this.ammoText.width,886,"LV.-",{fontFamily:"Staatliches",fontSize:"40px",align:"center",color:"#b8d1c3"}),this.add.text(1080,936,"∞",{fontFamily:"Staatliches",fontSize:"50px",align:"center",color:"#b8d1c3"}),this.makeBarBackground(130,60,320,60,0,4013098,24),this.rtBar=this.makeBar(130,60,0,60,0,16177694,30),this.rtIcon=this.physics.add.image(110,90,"rtIcon"),this.end_screen=this.physics.add.image(0,0,"end_screen").setOrigin(0),this.end_screen.setAlpha(0),this.death=this.physics.add.image(974,534,"death"),this.death.setAlpha(0)}update(){this.newRt=this.currentLevel.rt,this.newRt>this.rt&&this.newRt<=100&&(this.rt=this.currentLevel.rt,this.setValue(this.rtBar,130,60,320,60,0,16177694,30,this.rt/100),this.rtIcon.destroy(),this.rtIcon=this.physics.add.image(110,90,"rtIcon")),this.newRt>=30&&this.newRt<70&&0==this.haveRadiation1&&(this.physics.add.image(0,0,"radiation_1").setOrigin(0),this.haveRadiation1=!0),this.newRt>=70&&this.newRt<100&&0==this.haveRadiation2&&(this.physics.add.image(0,0,"radiation_2").setOrigin(0),this.haveRadiation2=!0),this.newRt>=100&&this.gameOver()}makeBarBackground(e,t,s,a,i,r,h){let l=this.add.graphics();return l.fillStyle(r,1),l.fillRoundedRect(0,0,s+i,a+2*i,1.25*h),l.x=e,l.y=t,l}makeBar(e,t,s,a,i,r,h){let l=this.add.graphics();return l.fillStyle(r,1),l.fillRoundedRect(0,i,s,a,h),l.x=e,l.y=t,l}setValue(e,t,s,a,i,r,h,l,n){e.destroy(),this.makeBar(t,s,a*n,i,r,h,l)}gameOver(){this.end_screen.setAlpha(1),this.death.setAlpha(1),this.newRt=100,this.rtIcon.destroy(),this.currentLevel.player.setAlpha(0)}}const l={type:e.AUTO,scale:{mode:e.Scale.FIT,parent:"phaser-example",autoCenter:e.Scale.CENTER_BOTH,width:1920,height:1080},physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}},scene:[s,r,h]};new e.Game(l);
