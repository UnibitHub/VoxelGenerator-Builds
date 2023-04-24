function sendEvent() {
	var myBody = 
	{
	   "events":[
		  {
			  "user_properties":{
				 "Server":"Prod",
				 "Fullscreen":false,
				 "ProcessorsCount":16,
				 "VideoCard":"NVIDIA GeForce GTX 1650",
				 "Min_RAM":16.0,
				 "Browser":null,
				 "Link_Open":"editor_MegaMod",
				 "Room_ID":"SERVER-EDITOR_ROOM_0001",
				 "Player_ID":"e6ba93c2-9534-4e6f-8d4f-2a864bef91c1",
				 "Player_Name":"",
				 "Skin_ID":null,
				 "Login_Method":"No Authorized",
				 "Email":"No Authorized"
			  },
			 "user_id":"675221f5d1a4121488d52ac6bbbaa532",
			 "session_id":1653224978235020318,
			 "insert_id":"638179658219672505_-417362788",
			 "app_version":"1.1.35",
			 "platform":"WindowsEditor",
			 "event_type":"Hello_World",
			 "time":1682364523002,
			 // "event_properties":{
				// "Ping":66,
				// "Players_Count":1,
				// "In_Room":true,
				// "Timer":2.14748365E+09
			 // }
		  }
	   ]
	}
	
	// var myBody = 
	// {
	   // "events":[
		  // {
			  // // "user_properties":{
				 // // "Server":"Prod",
				 // // "Fullscreen":false,
				 // // "ProcessorsCount":16,
				 // // "VideoCard":"NVIDIA GeForce GTX 1650",
				 // // "Min_RAM":16.0,
				 // // "Browser":null,
				 // // "Link_Open":"editor_MegaMod",
				 // // "Room_ID":"SERVER-EDITOR_ROOM_0001",
				 // // "Player_ID":"e6ba93c2-9534-4e6f-8d4f-2a864bef91c1",
				 // // "Player_Name":"",
				 // // "Skin_ID":null,
				 // // "Login_Method":"No Authorized",
				 // // "Email":"No Authorized"
			  // // },
			 // // "user_id":"675221f5d1a4121488d52ac6bbbaa532",
			 // // "session_id":1653224978235020318,
			 // // "insert_id":"638179608219672505_-417362788",
			 // "app_version":"1.1.35",
			 // "platform":"WindowsEditor",
			 // "event_type":"Hello_World",
			 // // "time":1682364023002,
			 // // "event_properties":{
				// // "Ping":66,
				// // "Players_Count":1,
				// // "In_Room":true,
				// // "Timer":2.14748365E+09
			 // // }
		  // }
	   // ]
	// }
	
	fetch('https://dev-better-space-api.herokuapp.com/api/game/httpApi', {
    method: 'POST',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(myBody)
	})
   .then(response => response.json())
   .then(response => console.log(JSON.stringify(response)))
}