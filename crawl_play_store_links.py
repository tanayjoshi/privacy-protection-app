import requests
from bs4 import BeautifulSoup
import sys,io
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import csv


#App store urls here
urls = ["https://play.google.com/store/apps/collection/topselling_free"]

for url in urls:

	page  = requests.get(url).text
	driver = webdriver.Firefox(executable_path='/Users/tanayjoshi/Downloads/geckodriver')
	driver.get(url)

	SCROLL_PAUSE_TIME = 0.5

	# Get scroll height
	last_height = driver.execute_script("return document.body.scrollHeight")

	while True:
	    # Scroll down to bottom
	    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

	    # Wait to load page
	    time.sleep(SCROLL_PAUSE_TIME)

	    # Calculate new scroll height and compare with last scroll height
	    new_height = driver.execute_script("return document.body.scrollHeight")
	    if new_height == last_height:
	        break
	    last_height = new_height	

	# CODE FOR EXTRA INFO -- NOT USED IN OUR WEBCRAWL
	'''clicker = requests.get(url).text
	elem = driver.find_element_by_class_name("id-view-permissions-details")
	elem.click()'''

	'''soup_expatistan = BeautifulSoup(page, "html.parser")
	

	expatistan_table = soup_expatistan.find("div", class_="id-app-title")

	print("App name: ", expatistan_table.string)
	
	
	expatistan_table = soup_expatistan.find("a", class_="card-click-target")
	
	print("Installs Range: ", expatistan_table.string)'''

	f = open('csvfile.csv','a')

	elem2=driver.find_elements_by_class_name("title")
	for element in elem2:
		info = element.get_attribute("href")
		print(info)
		f.write(str(info))
		f.write('\n') #Give your csv text here.

	f.close()
	

driver.quit()

			
			
		
		
	
