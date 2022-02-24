$(document).ready(function () {
    var location = {};
    $("#finish").on( "click",function (event) {
      var formData = {
        name: $("#name").val(),
        bio: $("#bio").val(),
        phone: $("#phone").val(),
        type : $("input[name=specs]").val(),
        street_name : $("input[name=street_name]").val(),
        street_number : $("input[name=street_number]").val(),
        city : $("input[name=city]").val(),
        location : location
      };
      $.ajax({
        type: "POST",
        url: "/hospital/save",
        data: JSON.stringify(formData),
        dataType: "json",
        encode: true,
      }).done(function (data) {
        alert(`Successfully Registered with token ${data.token}`)
      });
  
      event.preventDefault();
    });
    $("#location").on("click" , getLocation);

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            alert("Geolocation is not supported by this browser")   
        }
      }
      
      function showPosition(position) {
        let arr = [position.coords.latitude ,  position.coords.longitude]
        location.type = "Point";

        location.coordinates = arr;
        console.log(location)
      }
  });

