import { phonerecorder_backend } from "../../declarations/phonerecorder_backend";


document.querySelector("#add-contact").addEventListener("submit", async function(event) {
	// event.preventDefault();
	console.log("Submitted. ");

	const inputName = document.getElementById("input-name").value;
	const inputNumber = document.getElementById("input-number").value;

	await phonerecorder_backend.insertRecord(inputName, inputNumber);
});

document.querySelector("#find-contact").addEventListener("submit", async function(event) {
	event.preventDefault();
	// console.log("Submitted. ");

	const inputName = document.getElementById("find-name").value;
	const result = await phonerecorder_backend.lookup(inputName);
  // Handle potential errors (e.g., if no contact found)
  if (result) {
    document.getElementById("value").textContent = result;
  } else {
    document.getElementById("value").textContent = "No contact found.";
  }
});

document.querySelector("#delete-contact").addEventListener("submit", async function(event) {

	const inputName = document.getElementById("delete-name").value;

	// Attempt to delete the record
	const deletionSuccessful = await phonerecorder_backend.deleteRecord(inputName);

	if (deletionSuccessful) { // Check for successful deletion (optional)
	  document.getElementById("value").textContent = "Successful";
	} else {
	  // Handle deletion failure (optional)
	  console.error("Error deleting contact.");
	  // You can display an error message to the user here
	}
  });


document.querySelector("#get-all-btn").addEventListener("click", async function(event) {
	event.preventDefault();
	console.log("submitted");

	const records = await phonerecorder_backend.getRecords();

	if (records) {
	  // Clear any existing content (optional)
	  document.getElementById("value").textContent = "";

	  // Display each record (replace with your desired formatting)
	  records.forEach(record => {
		const contactElement = document.createElement("p");
		contactElement.textContent = record; // Adjust for record format
		document.getElementById("value").appendChild(contactElement);
	  });
	} else {
	  console.log("No contacts found."); // Handle case with no records
	}
  });
