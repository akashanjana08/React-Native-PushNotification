React-Native Push Notification Implementation

Step 1: 
  
    npm install react-native-fcm --save
	
Step 2:
  
    react-native link react-native-fcm
	
Step 3:
    android/build.gradle
         classpath 'com.android.tools.build:gradle:3.2.1'
      +  classpath 'com.google.gms:google-services:4.2.0' // google-services plugin
	 
Step 4:
     android/app/build.gradle
         apply from: "../../node_modules/react-native/react.gradle"
      +  apply plugin: 'com.google.gms.google-services'
	  
	  
	  dependency{
	    +  implementation 'com.google.firebase:firebase-core:16.0.7'
	  }
	  
Step 5: 
    
	  android/app/src/main/AndroidManifest.xml:
	  
	        <service android:name="com.evollu.react.fcm.MessagingService" android:enabled="true" android:exported="true">
               <intent-filter>
                  <action android:name="com.google.firebase.MESSAGING_EVENT"/>
               </intent-filter>
            </service>
 
            <service android:name="com.evollu.react.fcm.InstanceIdService" android:exported="false">
              <intent-filter>
                <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
              </intent-filter>
            </service>
			
			
		<activity
        android:name=".MainActivity"
        android:label="@string/app_name"
    +    android:launchMode="singleTop"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
        android:windowSoftInputMode="adjustResize">
			
			
			
			
Step 6 :

        Add google-services.json in below path:
            android/app/google-services.json		
			
			
Step 7:

        Mainactivity.java

        + import android.content.Intent;

            @Override
			protected String getMainComponentName() {
				return "PushNotFirebase";
            }

			@Override
		+	public void onNewIntent(Intent intent) {
				super.onNewIntent(intent);
			setIntent(intent);
			}		 
			
			
step 8:

       Add local.properties file in android folder and add line in
	      dk.dir =C:/Users/akash.sharma/AppData/Local/Android/Sdk
		  
step 9:  App.js

    a)       import FCM,{FCMEvent} from "react-native-fcm";

        
			
	b)		constructor(props) {
			super(props);

			this.state = {
			  token: "",
			  tokenCopyFeedback: "",
			  fcmMessage:""
			}
		  }		
		  
		  
	c)     async componentDidMount(){
              try{
                let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
			  } catch(e){
			    console.error(e);
			  }
    
             FCM.getFCMToken().then(token => {                               // This is for taken the token
               console.log("TOKEN (getFCMToken)", token);
               this.setState({token: token || ""})
             });

             FCM.on(FCMEvent.Notification, (notif)=> {                         // This is for get The Notification Message eg: 
               console.log("====================================")
               this.setState({fcmMessage: notif})
               console.log(JSON.stringify(this.state.fcmMessage))
               ToastAndroid.show(this.state.fcmMessage.name , ToastAndroid.SHORT)
              })
            }	  
			
			
			Note: Get message from FCM eg
			{"Employee":"R systems","name":"akash","google.sent_time":1551264355554,"google.message_id":"0:1551264355850980%679c1413679c1413","from":"40516833983","collapse_key":"com.pushnotfirebase","fcm":{"action":null,"tag":"campaign_collapse_key_6044557977501061543","icon":null,"color":null,"body":"Data The rang","title":"ReactAkash"}}
			
			
			
			
			
			
