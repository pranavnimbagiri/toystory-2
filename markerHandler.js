AFRAME.registerComponent("markerhandler",{
    init:function(){
        this.el.addEventListener("markerFound",()=>{
            console.log("markerisfound")
            this.handleMarkerFound()
        })
        this.el.addEventListener("markerLost",()=>{
            console.log("markerislost")
            this.handleMarkerLost()
        })
    },
    handleMarkerFound:function(){
        var buttondiv=document.getElementById("button-div")
        buttondiv.style.display="flex"
        var ratingbutton=document.getElementById("rating-button")
        var orderbutton=document.getElementById("order-button")
        ratingbutton.addEventListener("click",function(){
            swal({
                icon:"warning",
                title:"Rate dish",
                text:"work in progress"
            })
        })
        orderbutton.addEventListener("click",function(){
            swal({
                icon:"https://i.imgur.com/4NZ6uLY.jpg",
                title:"thanks for your order",
                text:"your or;der would be served soon on the table"
            })
        })
    },
    handleMarkerLost:function(){
        var buttondiv=document.getElementById("button-div")
        buttondiv.style.display="none"
    }
})