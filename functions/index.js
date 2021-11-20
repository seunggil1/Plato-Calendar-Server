const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// 만들고 배포하기 기초
// https://here4you.tistory.com/232

// 모든 장치로 보내기
// https://stackoverflow.com/questions/38237559/how-do-you-send-a-firebase-notification-to-all-devices-via-curl

// 배포는 firebase deploy --only functions
// 요금든다 조심.
exports.requestSync = functions.https.onRequest((request, response) => {
  const token = request.body["password"];
  if (token != "plato") {
    response.send("password is incorrect.");
    return;
  }
  const message = {
    // notification: {
    //     title: '$FooCorp up 1.43% on the day',
    //     body: '$FooCorp gained 11.80 points to close'
    //   },
    data: {
      func: "sync",
    },

    android: {
      "ttl": "3540s", // 3540초 이후 만료.
    },

    // apn == Apple Push Notification service
    // apns: {
    //   headers: {
    //     "apns-expiration": "3540", // unix time으로 3540까지 유효함
    //   },
    // },

    topic: "all",
    // 이런 것도 가능
    // "condition": "'TopicA' in topics && 'TopicB' in topics"
  };
  admin.messaging().send(message).then((response) => {
  // Response is a message ID string.
    // console.log("Successfully sent message:", response);
  }).catch((error) => {
    // console.log("Error sending message:", error);
  });
  // functions.logger.info("requestSync Log", {structuredData: true});
  response.send("Sync request is finished.");
});

exports.requestNotify = functions.https.onRequest((request, response) => {
  const token = request.body["password"];
  if (token != "plato") {
    response.send("password is incorrect.");
    return;
  }
  const message = {
    data: {
      func: "noti",
    },

    android: {
      "ttl": "3540s",
    },

    topic: "all",
  };
  admin.messaging().send(message).then((response) => {
    // console.log("Successfully sent message:", response);
  }).catch((error) => {
    // console.log("Error sending message:", error);
  });
  // functions.logger.info("requestSync Log", {structuredData: true});
  response.send("Notify request is finished.");
});

exports.requestDebugSync = functions.https.onRequest((request, response) => {
  const token = request.body["password"];
  if (token != "plato") {
    response.send("password is incorrect.");
    return;
  }
  const message = {
    // notification: {
    //     title: '$FooCorp up 1.43% on the day',
    //     body: '$FooCorp gained 11.80 points to close'
    //   },
    data: {
      func: "sync",
    },

    android: {
      "ttl": "3540s",
    },

    topic: "debug",
    // 이런 것도 가능
    // "condition": "'TopicA' in topics && 'TopicB' in topics"
  };
  admin.messaging().send(message).then((response) => {
  // Response is a message ID string.
    // console.log("Successfully sent message:", response);
  }).catch((error) => {
    // console.log("Error sending message:", error);
  });
  // functions.logger.info("requestSync Log", {structuredData: true});
  response.send("Sync request is finished.");
});
