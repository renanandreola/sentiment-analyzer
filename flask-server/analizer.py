from flask import Flask, request, jsonify
from textblob import TextBlob
import matplotlib.pyplot as plt

app = Flask(__name__)

@app.route("/getSentiment", methods=['POST'])
def getWords():
    data = request.get_json()  # Acessa os dados enviados como JSON
    # Processar os dados recebidos
    input_data = data['data']
    
    print("input_data", input_data)
    
    def percentage(parte, total):
        return 100*float(parte)/float(total)

    positivo = 0
    negativo = 0
    neutro = 0
    polaridade = 0

    contents = []
    contents.append(TextBlob(input_data))
    # contents.append(TextBlob("Soon of a beeach"))
    # contents.append(TextBlob("mamae aqui"))
    # contents.append(TextBlob("Mame aqui"))

    for item in contents:
        polaridade += item.sentiment.polarity
        print(item, "\n", item.sentiment)
        
        if(item.sentiment.polarity == 0):
            neutro += 1
        elif(item.sentiment.polarity < 0):
            negativo += 1
        elif(item.sentiment.polarity > 0):
            positivo += 1
            
    positivo = format(percentage(positivo, len(contents)), '.2f')
    negativo = format(percentage(negativo, len(contents)), '.2f')
    neutro = format(percentage(neutro, len(contents)), '.2f')

    labels = ['Positivo [' + str(positivo) + '%]', 'Neutro [' + str(neutro) + '%]', 'Negativo [' + str(negativo) + '%]']
    sizes = [positivo, neutro, negativo]
    colors = ['green', 'lightgray', 'red']
    patches,texts = plt.pie(sizes, colors=colors, startangle=90)
    
    print("sizes >>>>>>>>>>>>>>>>>>>>>>> ", sizes)

    plt.legend(patches, labels, loc="best")
    plt.axis('equal')
    plt.tight_layout()
    # plt.show()
    
    return sizes;

if __name__ == "__main__":
    app.run()
    
# from textblob import TextBlob
# import matplotlib.pyplot as plt

# def percentage(parte, total):
#     return 100*float(parte)/float(total)

# positivo = 0
# negativo = 0
# neutro = 0
# polaridade = 0

# contents = []
# contents.append(TextBlob("Fuck you men"))
# contents.append(TextBlob("Soon of a beeach"))
# contents.append(TextBlob("mamae aqui"))
# contents.append(TextBlob("Mame aqui"))

# for item in contents:
#     polaridade += item.sentiment.polarity
#     print(item, "\n", item.sentiment)
    
#     if(item.sentiment.polarity == 0):
#         neutro += 1
#     elif(item.sentiment.polarity < 0):
#         negativo += 1
#     elif(item.sentiment.polarity > 0):
#         positivo += 1
        
# positivo = format(percentage(positivo, len(contents)), '.2f')
# negativo = format(percentage(negativo, len(contents)), '.2f')
# neutro = format(percentage(neutro, len(contents)), '.2f')

# labels = ['Positivo [' + str(positivo) + '%]', 'Neutro [' + str(neutro) + '%]', 'Negativo [' + str(negativo) + '%]']
# sizes = [positivo, neutro, negativo]
# colors = ['green', 'lightgray', 'red']
# patches,texts = plt.pie(sizes, colors=colors, startangle=90)

# plt.legend(patches, labels, loc="best")
# plt.axis('equal')
# plt.tight_layout()
# plt.show()