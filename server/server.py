from flask import Flask, request
app = Flask(__name__)

# Members API Route

@app.route("/app")
def index():
    return {"manager":["manager1","manager2"]}

if __name__ == '__main__':
    app.run(debug=True)

