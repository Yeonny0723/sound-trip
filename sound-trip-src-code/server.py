from flask import Flask, request
import pandas as pd
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)

# API route

@app.route("/audio")
@cross_origin()
def audio():
    params = ""
    if request.args.get("tags"):
        params = request.args.get("tags").split("-")
        df = pd.read_csv("df_ambient_sound.csv", index_col="Unnamed: 0")
        filtered_df = df[df.tags.str.contains('|'.join(params))] # filter rows that contains at least one selected tag
        filtered_lst = filtered_df.values.tolist() # convert dataframe(series) to list. eg. title | tags -> [title.tags]
        return filtered_lst
    else:
        return []

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=False)