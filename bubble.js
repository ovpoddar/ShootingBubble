class Bubble {
    constructor(xPos, yPos, fill) {
        this.fill = fill;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radious = 16;
    }

    show() {
        ellipseMode(CENTER);
        fill(this.fill);
        ellipse(this.xPos, this.yPos, this.radious * 2);
    }
}

class StaticBubble extends Bubble {
    constructor(xPos, yPos, fill, index) {
        super(xPos, yPos, fill);
        this.arreyPos = index;
        this.Naibour = {};
    }

    initilised(all) {
        var left = all[this.arreyPos - 1];
        var right = all[this.arreyPos + 1];
        var top = all[this.arreyPos - int(width / 32)];
        var bottom = all[this.arreyPos + int(width / 32)];
        var topLeft = all[(this.arreyPos - int(width / 32)) - 1];
        var topRight = all[(this.arreyPos - int(width / 32)) + 1];
        var BottomRight = all[(this.arreyPos + int(width / 32)) + 1];
        var BottomLeft = all[(this.arreyPos + int(width / 32)) - 1];


        if (left == undefined || this.arreyPos % (int(width / 32)) == 0 || this.fill != left.fill) {} else {
            this.Naibour.Left = left;
        }

        if (right == undefined || this.arreyPos % (int(width / 32)) == ((int(width / 32) - 1)) || this.fill != right.fill) {} else {
            this.Naibour.Right = right;
        }

        if (top == undefined || this.fill != top.fill) {} else {
            this.Naibour.Top = top;
        }

        if (bottom == undefined || this.fill != bottom.fill) {} else {
            this.Naibour.Bottom = bottom;
        }

        if (topLeft == undefined || this.arreyPos % (int(width / 32)) == 0 || this.fill != topLeft.fill) {} else {
            this.Naibour.Top_Left = topLeft;
        }

        if (topRight == undefined || this.arreyPos % (int(width / 32)) == ((int(width / 32) - 1)) || this.fill != topRight.fill) {} else {
            this.Naibour.Top_Right = topRight;
        }

        if (BottomLeft == undefined || this.arreyPos % (int(width / 32)) == 0 || this.fill != BottomLeft.fill) {} else {
            this.Naibour.Bottom_Left = BottomLeft;
        }

        if (BottomRight == undefined || this.arreyPos % (int(width / 32)) == ((int(width / 32) - 1)) || this.fill != BottomRight.fill) {} else {
            this.Naibour.Bottom_Right = BottomRight;
        }
    }


}

class MovingBubble extends Bubble {
    constructor(xPos, yPos, fill) {
        super(xPos, yPos, fill);
        this.isMoving = false;
        this.speed = 6;
        this.angel = 0;


        this.t = 1;
    }

    update() {
        if (this.isMoving) {
            angleMode(DEGREES);
            this.xPos += cos(this.angel) * this.speed;
            this.yPos += sin(this.angel) * this.speed;
        }
    }

    edgs() {
        if (this.xPos - this.radious < 0) {
            this.xPos = this.radious;
            this.angel = atan2(sin(this.angel), cos(this.angel) * -1);
        } else if (this.xPos + this.radious > width) {
            this.xPos = width - this.radious;
            this.angel = atan2(sin(this.angel), cos(this.angel) * -1);
        }
        if (this.yPos - this.radious < 0) {
            this.yPos = this.radious;
            this.isMoving = false;
            shootingbubble.shift();
        } else if (this.yPos + this.radious > height) {
            this.yPos = height - this.radious * 2;
        }
    }

    targeting(angel) {
        constrain(angel, 0, 180)
        this.angel = angel;
        this.isMoving = true;
    }

    coliding(outhers) {
        outhers.forEach(other => {
            var d = dist(this.xPos, this.yPos, other.xPos, other.yPos);
            if (d < this.radious * 2) {
                this.isMoving = false;
                shootingbubble.shift();
                this.shouldRemove(other);
            }
        });

    }
    shouldRemove(other) {
        if (other.fill == this.fill) {
            this.recNeibourremove(other);
        }
        else{
            console.log(other.angel);
            // bubbls.push(new StaticBubble(other.xPos, other.yPos + 32, this.fill, other.arreyPos + int(width / 32)));
        }
    }

    recNeibourremove(other) {
        var naibours = other.Naibour;
        delete bubbls[other.arreyPos];
        if (Object.keys(naibours).length < 0) {
            return;
        } else {
            if (naibours.Top != undefined) {
                if (bubbls[naibours.Top.arreyPos] != undefined || bubbls[naibours.Top.arreyPos] != null) {
                    this.recNeibourremove(naibours.Top);
                }
            }
            if (naibours.Bottom != undefined) {
                if (bubbls[naibours.Bottom.arreyPos] != undefined || bubbls[naibours.Bottom.arreyPos] != null) {
                    this.recNeibourremove(naibours.Bottom);
                }
            }
            if (naibours.Left != undefined) {
                if (bubbls[naibours.Left.arreyPos] != undefined || bubbls[naibours.Left.arreyPos] != null) {
                    this.recNeibourremove(naibours.Left);
                }
            }
            if (naibours.Right != undefined) {
                if (bubbls[naibours.Right.arreyPos] != undefined || bubbls[naibours.Right.arreyPos] != null) {
                    this.recNeibourremove(naibours.Right);
                }
            }
            if(naibours.Top_Left != undefined){
                if(bubbls[naibours.Top_Left.arreyPos] != undefined || bubbls[naibours.Top_Left.arreyPos] != null){
                    this.recNeibourremove(naibours.Top_Left);
                }
            }
            if(naibours.Top_Right != undefined){
                if(bubbls[naibours.Top_Right.arreyPos] != undefined || bubbls[naibours.Top_Right.arreyPos] != null){
                    this.recNeibourremove(naibours.Top_Right);
                }
            }
            if(naibours.Bottom_Left != undefined){
                if(bubbls[naibours.Bottom_Left.arreyPos] != undefined || bubbls[naibours.Bottom_Left.arreyPos] != null){
                    this.recNeibourremove(naibours.Bottom_Left);
                }
            }
            if(naibours.Bottom_Right != undefined){
                if(bubbls[naibours.Bottom_Right.arreyPos] != undefined || bubbls[naibours.Bottom_Right.arreyPos] != null){
                    this.recNeibourremove(naibours.Bottom_Right);
                }
            }
        }
    }
}