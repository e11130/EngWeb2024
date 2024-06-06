#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      dario
#
# Created:     06/06/2024
# Copyright:   (c) dario 2024
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import json
if __name__ == '__main__':
    with open('livros.json', 'r') as file:
        data = json.load(file)

    for i,item in enumerate(data):

        try:
            item["author"] = item["author"].split(",")
        except:
            pass

        try:
            item["genres"] = eval(item["genres"])
        except:
            item["genres"] = None
        try:
            item["characters"] = eval(item["characters"])
        except:
            item["characters"] = None
        try:
            item["awards"] = eval(item["awards"])
        except:
            item["awards"] = None
        try:
            item["ratingsByStars"] = eval(item["ratingsByStars"])
            for i,rating in enumerate(item["ratingsByStars"]):
                item["ratingsByStars"][i] = int(rating)
        except:
            item["ratingsByStars"] = None

        try:
            item["setting"] = eval(item["setting"])
        except:
            item["setting"] = None
        try:
            item["rating"] = eval(item["rating"])
        except:
            item["rating"] = None
        try:
            item["pages"] = int(item["pages"])
        except:
            item["pages"] = None

        try:
            item["numRatings"] = eval(item["numRatings"])
        except:
            item["numRatings"] = None
        try:
            item["likedPercent"] = int(item["likedPercent"])
        except:
            item["likedPercent"] = None
        try:
            item["bbeScore"] = eval(item["bbeScore"])
        except:
            item["bbeScore"] = None
        try:
            item["bbeVotes"] = eval(item["bbeVotes"])
        except:
            item["bbeVotes"] = None
        try:
            item["price"] = float(item["price"])
        except:
            item["price"] = None
        print(json.dumps(item, indent=2))