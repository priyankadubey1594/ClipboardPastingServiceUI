$(document).ready(function(){
		$("#reset").click(function() {
			resetForm();
			resetAlerts();
			resetClass();
		});
		$("#create").click(function(e){
			e.preventDefault();
			resetAlerts();
			resetClass();

			// $.ajax('http://localhost:8001', {
			//     type:"POST",
			//     dataType:"json",
			//     data:{action:"something"}, 
			//     success:function(data, textStatus, jqXHR) {alert("success");},
			//     error: function(jqXHR, textStatus, errorThrown) {alert("failure");}
			// });
			

			var err=0;
			var content= $("#content"), expiration=$("#expiration"), exposure=$("#exposure"), name=$("#name"), password= $("#password");
			if(content.val()=="") {
				content.addClass("error-border");
				err++;
			}  
			if(expiration.val()=="") {
				expiration.addClass("error-border");
				err++;
			}
			if(exposure.val()=="") {
				exposure.addClass("error-border");
				err++;
			}
			if(name.val()=="") {
				name.addClass("error-border");
				err++;
			}
			if(password.val()=="") {
				password.addClass("error-border");
				err++;
			}
			if(err!=0) {
				$("#postForm").before("<div class='alert alert-danger' role='alert' id='err'>Please fill/correct the highlighted fields to proceed</div>");
				return false;
			} else {
				data={content:content.val(),expiration:expiration.val(),exposure:exposure.val(),name:name.val(),password:password.val()};
				$.ajax({
				  type: "POST",
				  url: "http://localhost:8001/PostContent.php",
				  //dataType: 'json',
				  data:data,
				  // headers: {
				  // "Content-Type":"application/json",
				  // "Accept":"application/json",
				  // "X-AccessKey": "qaqaegtr124jnjiddlo0was22",
				  // "Origin":"http://localhost:8002"
				  // },
				  success: function (result){
				  	var res = JSON.parse(result)
				  	//console.log(res.status );
				  	if(res.status == "success"){
				  		var contentUrl = makeContentUrl(res.data);
				        $("#postForm").after("<div class='alert alert-success' role='alert' id='success'>The content has been saved successfully.<div><a href='"+contentUrl+"' target='_blank'>"+contentUrl+"</a></div></div>");
				        resetForm();
				  	} else {
				  		alert(res.message);
				  	}
				      
				  },
				  error: function( error) {
				  	console.log(error);
				  }
				  	
				});
			}
		});

		function makeContentUrl(postId) {
			var url=window.location.href;
			var contentUrl = url + "content.html?postId=" + postId;
			return contentUrl;
		}

		function resetForm() {
			$("#postForm").find("input[type=text], input[type=password], textarea").val("");
		}

		function resetAlerts() {
			$("#success").remove();
			$("#err").remove();
		}

		function resetClass() {
			$("#postForm").find("input[type=text], input[type=password], textarea").removeClass("error-border");
		}

	});
		