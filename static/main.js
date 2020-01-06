try {
    var webSocket = new WebSocket("ws://localhost:3000", ["test", "test2"]);
} catch(e) {
    console.log(e.message);
}