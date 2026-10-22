from app import app

main = app(__name__)

def run():
    main.run(host="0.0.0.0", port=5000, debug=True)
if __name__ == "__main__":
    run()
