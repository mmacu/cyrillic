import json

with open('cyrillic.json', 'r') as cyrillic_file:
	cyrillic_json = json.load(cyrillic_file)
	base_locale_json = {letter['uppercase'] : letter['name'] for letter in cyrillic_json}
	with open('common.json', 'w') as base_locale_file:
		json.dump(base_locale_json, base_locale_file, indent=4)
	
		


