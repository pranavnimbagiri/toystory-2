AFRAME.registerComponent("create-marker",{
    init:async function(){
        var mainscene=document.querySelector("#main-scene")
        var dishes=await this.getDishes()
        dishes.map(dish=>{
            var marker=document.createElement("a-marker")
            marker.setAttribute("id",dish.id)
            marker.setAttribute("type","pattern")
            marker.setAttribute("url",dish.marker_pattern)
            marker.setAttribute("cursor",{rayOrgin:"mouse"})
            marker.setAttribute("markerhandler",{})
            mainscene.appendChild(marker)
            var model=document.createElement("a-entity")
            model.setAttribute("id",`model-${dish.id}`)
            model.setAttribute("position",dish.model_geometry.position)
            model.setAttribute("scale",dish.model_geometry.scale)
            model.setAttribute("rotation",dish.model_geometry.rotation)
            model.setAttribute("gltf-model",`url(${dish.model_url})`)
            model.setAttribute("gesture-handler",{})
            marker.appendChild(model)
            var mainplane=document.createElement("a-plane")
            mainplane.setAttribute("id",`main-plane-${dish.id}`)
            mainplane.setAttribute("position",{x:0,y:0,z:0})
            mainplane.setAttribute("rotation",{x:-90,y:0,z:0})
            mainplane.setAttribute("width",1.7)
            mainplane.setAttribute("height",1.5)
            marker.appendChild(mainplane)
            var titleplane=document.createElement("a-plane")
            titleplane.setAttribute("id",`title-plane-${dish.id}`)
            titleplane.setAttribute("position",{x:0,y:0.89,z:0.02})
            titleplane.setAttribute("rotation",{x:0,y:0,z:0})
            titleplane.setAttribute("width",1.69)
            titleplane.setAttribute("height",0.3)
            titleplane.setAttribute("material",{color:"#f0c30f"})
            marker.appendChild(titleplane)
            var dishtitle=document.createElement("a-entity")
            dishtitle.setAttribute("id",`dish-title-${dish.id}`)
            dishtitle.setAttribute("position",{x:0,y:0,z:0.1})
            dishtitle.setAttribute("rotation",{x:0,y:0,z:0})
            dishtitle.setAttribute("text",{
                font:"monoid",
                color:"black",
                width:1.8,
                height:1,
                align:"center",
                value:dish.dish_name.toUpperCase()
                
            })
            titleplane.appendChild("dish_title")
            var ingredients=document.createElement("a-entity")
            ingredients.setAttribute("id",`ingredients-${dish.id}`)
            ingredients.setAttribute("position",{x:0.3,y:0,z:0.1})
            ingredients.setAttribute("rotation",{x:0,y:0,z:0})
            ingredients.setAttribute("text",{
                font:"monoid",
                color:"black",
                width:2,
                align:"left",
                value:`${dish.ingredients.join("\n\n")}`
            })
            mainplane.appendChild(ingredients)
        })

    },
    getDishes:async function(){
        return await firebase
        .firestore()
        .collection("dishes")
        .get()
        .then(snap=>{
            return snap.docs.map(doc=>doc.data())
        })
    }

})