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
                this.shouldRemove(other);
                // create a static bubble with bottom formula
            }
        });

    }
    shouldRemove(other) {
        if (other.fill == this.fill) {
            delete bubbls[other.arreyPos];
            this.recNeibourremove(other);
            shootingbubble.shift();
        }
    }

    recNeibourremove(other) {
        var t, b, l, r, br, bl, tr, tl;
        if (other.Naibour.Top != undefined || other.Naibour.Top != null) {
            t = other.Naibour.Top;
            delete bubbls[other.Naibour.Top.arreyPos];
        }
        if (other.Naibour.Left != undefined || other.Naibour.Left != null) {
            l = other.Naibour.Left;
            delete bubbls[other.Naibour.Left.arreyPos];
        }
        if (other.Naibour.Right != undefined || other.Naibour.Rigth != null) {
            r = other.Naibour.Right;
            delete bubbls[other.Naibour.Right.arreyPos];
        }
        if (other.Naibour.Bottom_Right != undefined || other.Naibour.Bottom_Right != null) {
            br = other.Naibour.Bottom_Right;
            delete bubbls[other.Naibour.Bottom_Right.arreyPos];
        }
        if (other.Naibour.Bottom_Left != undefined || other.Naibour.Bottom_Left != null) {
            bl = other.Naibour.Bottom_Left;
            delete bubbls[other.Naibour.Bottom_Left.arreyPos];
        }
        if (other.Naibour.Top_Right != undefined || other.Naibour.Top_Right != null) {
            tr = other.Naibour.Top_Right;
            delete bubbls[other.Naibour.Top_Right.arreyPos];
        }
        if (other.Naibour.Top_Left != undefined || other.Naibour.Top_Left != null) {
            tl = other.Naibour.Top_Left;
            delete bubbls[other.Naibour.Top_Left.arreyPos];
        }

        console.log(t, b, l, r, br, bl, tr, tl);

        if(t != undefined){
            this.recNeibourremove(t);
        }
        if(b != undefined){
            this.recNeibourremove(b);
        }
        if(l != undefined){
            this.recNeibourremove(l);
        }
        if(r != undefined){
            this.recNeibourremove(r);
        }

        
        if(tr != undefined){
            this.recNeibourremove(tr);
        }
        if(tl != undefined){
            this.recNeibourremove(tl);
        }
        if(br != undefined){
            this.recNeibourremove(br);
        }
        if(bl != undefined){
            this.recNeibourremove(bl);
        }
    }
}