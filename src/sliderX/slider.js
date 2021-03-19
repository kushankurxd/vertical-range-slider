let m = {};//the mouse

function oMousePosSVG(e, svg) {
    let p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const ctm = svg.getScreenCTM().inverse();
    p = p.matrixTransform(ctm);
    return p;
  }

export default class DBSlider {
  constructor(elmt, type) {
    this.elmt = elmt;
    this.dragging = false;
    this.d ={}//the distance between the center of the thumb and the mouse on "mousedown"
    this.left = elmt.querySelector(".left");
    this.right = elmt.querySelector(".right");
    //the slider's thumbs
    this.thumbs = [this.left, this.right];
    
    this.thisone;//the active thumb
    this.theother;//the other thumb
    
    this.type = type; //x for horizontal or y for vertical
    //the text element
    this.text = [
      this.left.querySelector("text"),
      this.right.querySelector("text")
    ];

    this.theForm = window.document.getElementById("theForm")
    this.vals = [
      //for the form
      this.theForm.querySelector(`#${this.type}min`),
      this.theForm.querySelector(`#${this.type}max`)
    ];

    this.thumbs.map((th, i) => {
      const transf = th.getAttribute("transform");
      // get the value of the transformation
      const p = transf.substring(10, transf.length - 1).split(",");
      //the thumb's center
      th.center = {
        x: Number(p[0]),
        y: Number(p[1])
      };

      th.addEventListener("mousedown", e => {
        m = oMousePosSVG(e, this.elmt);
        this.dragging = i + 1;
        this.thisone = th;
        this.theother = this.thumbs[this.dragging % 2];

        this.d.x = th.center.x - m.x;
        this.d.y = th.center.y - m.y;
      });
    });

    this.elmt.addEventListener("mousemove", e => {
      if (this.dragging) {
        m = oMousePosSVG(e, this.elmt);
        // the position for the relevant coordinate
        let pos = m[this.type] + this.d[this.type];
        // limit the thumb can not get out the track
        if (pos < 0) {
          pos = 0;
        }
        if (pos > 100) {
          pos = 100;
        }

        //reset the value of the center.x / center.y
        const c = this.thumbs[this.dragging - 1].center;
        //the c.x if the type is x or c.y if rge type is y
        c[this.type] = pos;
        // translate the group
        this.thumbs[this.dragging - 1].setAttributeNS(
          null,
          "transform",
          `translate(${c.x},${c.y})`
        );
        // change the textContent of the text
        this.text[this.dragging - 1].textContent = Math.round(pos);
        //change the value of the corresponding input
        this.vals[this.dragging - 1].value = Math.round(pos);

        // get the distange between the thumbs
        const dist = this.right.center[this.type] - this.left.center[this.type];

        // if the distance is < 0 you drag the other one
        if (dist < 0) {
          this.dragging = this.dragging % 2 + 1;
        }
      }
    });

    this.elmt.addEventListener("mouseup", e => {
      m = oMousePosSVG(e, this.elmt);
      this.dragging = false;
      this.elmt.style.zIndex = 1;
      
    this.elmt.addEventListener("mouseleave", (e) => {
      m = oMousePosSVG(e,this.elmt);
      this.dragging = false;  
    });
    });
  }
}



