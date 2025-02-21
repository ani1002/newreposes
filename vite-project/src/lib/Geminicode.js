

genai.configure(api_key=os.environ["GEMINI_API_KEY"])


generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "suppose think you are a travvel agent and i am going to visit puri in cheap for 5 poerson you have to suugest me the hotelName,hotelPrice place ,coordinate,hotel adress, rating hotel image URL, geolocation and suggest some itinary place visit there in the same name placeName ,TicketPrice, imageurl, rating time travvel with date plan in json format for 3 days ",
      ],
    },
    {
      "role": "model",
      "parts": [
        "```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Puri, Odisha, India\",\n    \"travelers\": 5,\n    \"duration\": 3,\n    \"budget\": \"cheap\" \n  },\n  \"hotel\": {\n    \"name\": \"Hotel Toshali Sands\",  //Example -  Replace with a currently cheap option based on availability.\n    \"pricePerNight\": 2500, // Example price -  This is an approximation and needs to be verified.  Divide by 5 for per person cost.\n    \"address\": \"Swargadwar Rd, Puri, Odisha 752001, India\",\n    \"coordinates\": {\n      \"latitude\": 19.8044,\n      \"longitude\": 85.8306\n    },\n    \"rating\": 4.0,\n    \"imageUrl\": \"https://example.com/hotelImage.jpg\" , // Replace with actual image URL\n    \"geolocation\": \"https://www.google.com/maps/place/Hotel+Toshali+Sands/@19.8044,85.8306,17z\" // Example - replace with actual geo link\n  },\n  \"itinerary\": {\n    \"day1\": {\n      \"placeName\": \"Jagannath Temple\",\n      \"ticketPrice\": 0, // Free entry, but may need to pay for special darshan\n      \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jagannath_Temple%2C_Puri.jpg/1200px-Jagannath_Temple%2C_Puri.jpg\",\n      \"rating\": 4.8,\n      \"timeToSpend\": \"4 hours\",\n      \"travelTime\": \"15 minutes (from hotel - Assuming hotel is centrally located)\",\n      \"date\": \"YYYY-MM-DD\" // Replace with your planned date\n    },\n    \"day1\": {\n      \"placeName\": \"Puri Beach\",\n      \"ticketPrice\": 0,\n      \"imageUrl\": \"https://www.holidify.com/images/cmsuploads/guide/puri-beach-3.jpg\",\n      \"rating\": 4.5,\n      \"timeToSpend\": \"3 hours\",\n      \"travelTime\": \"10 minutes (from Jagannath Temple)\",\n      \"date\": \"YYYY-MM-DD\" \n    },\n    \"day2\": {\n      \"placeName\": \"Konark Sun Temple\",\n      \"ticketPrice\": 100, // Example price - Verify current price.\n      \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Konark_Sun_Temple_Odisha_India.jpg/1280px-Konark_Sun_Temple_Odisha_India.jpg\",\n      \"rating\": 4.7,\n      \"timeToSpend\": \"4 hours\",\n      \"travelTime\": \"1 hour (from Puri - by taxi or bus)\",\n      \"date\": \"YYYY-MM-DD\"\n    },\n    \"day2\": {\n      \"placeName\": \"Chandrabhaga Beach\",\n      \"ticketPrice\": 0,\n      \"imageUrl\": \"https://www.holidify.com/images/cmsuploads/guide/chandrabhaga-beach-puri-1.jpg\",\n      \"rating\": 4.0,\n      \"timeToSpend\": \"2 hours\",\n      \"travelTime\": \"30 minutes from Konark\",\n      \"date\": \"YYYY-MM-DD\"\n    },\n    \"day3\": {\n      \"placeName\": \"Gundicha Temple\",\n      \"ticketPrice\": 0,\n      \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Gundicha_Temple%2C_Puri.jpg/1280px-Gundicha_Temple%2C_Puri.jpg\",\n      \"rating\": 4.4,\n      \"timeToSpend\": \"2 hours\",\n      \"travelTime\": \"20 minutes (from hotel)\",\n      \"date\": \"YYYY-MM-DD\"\n    },\n    \"day3\": {\n      \"placeName\": \"Local Market Shopping\",\n      \"ticketPrice\": \"Variable\",\n      \"imageUrl\": \"https://example.com/purimarket.jpg\", //Replace with actual image\n      \"rating\": 4.2,\n      \"timeToSpend\": \"3 hours\",\n      \"travelTime\": \"15 minutes (from Gundicha Temple)\",\n      \"date\": \"YYYY-MM-DD\"\n    }\n  },\n  \"notes\": [\n    \"Prices are approximate and may vary depending on season and availability.\",\n    \"Transportation costs are not included. Consider hiring a taxi or using local buses.\",\n    \"Book accommodations and transportation in advance, especially during peak season.\",\n    \"Confirm all ticket prices before your visit.\"\n  ]\n}\n```\n\n**Disclaimer:**  Remember to replace the placeholder image URLs, hotel details,  and prices with current, accurate information before using this JSON for your planning.  Hotel prices fluctuate, and this is just a sample using one hotel as an example. You should check multiple hotels and booking sites to find the best deal.  Transportation costs are also not included and should be factored into your budget.\n",
      ],
    },
  ]
)

response = chat_session.send_message("INSERT_INPUT_HERE")

print(response.text)