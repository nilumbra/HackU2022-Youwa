import collections
from collections import OrderedDict
import json

TEXTS = ["甲", "乙"]
def main():
    # input_file = "./ruby_output.json" 
    # output_file = "./flagged.json"

    input_json = input()
    json_load = json.loads(input_json, object_pairs_hook=collections.OrderedDict)
    json_search(json_load)
    print(json.dumps(json_load, ensure_ascii=False))

    # with open(input_file, "r") as f:
    #     json_load = json.load(f, object_pairs_hook=collections.OrderedDict)
    #     # print(json_load)
    #     json_search(json_load)
    #     with open(output_file, "w", encoding="utf-8") as p:
    #         json.dump(json_load, p, ensure_ascii=False)

def json_search(data, depth = 0):
    if type(data) == OrderedDict or type(data) == dict:
        for k in list(data.keys()):
            if type(data[k]) == str:
                flag = []
                for j, t in enumerate(TEXTS):
                    if t in data[k]:
                        flag.append(j)
                data["flag"]=flag
            json_search(data[k] , depth + 1)
    elif type(data) == list:
        for i in range(len(data)):
            if type(data[i]) == str:
                flag = []
                for j, t in enumerate(TEXTS):
                    if t in data[i]:
                        flag.append(j)
                data["flag"]=flag
            
            json_search(data[i] , depth + 1)
    else:
        return


if __name__ == "__main__":
    main()