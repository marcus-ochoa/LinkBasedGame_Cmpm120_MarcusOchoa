class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices

                if(choice.Lock && choice.Lock == "Locked") {
                    continue;
                }

                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);

            if (choice.Target == "File Cabinet") {
                this.engine.gotoScene(FilesInteraction, "File 1");
            } else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

class FilesInteraction extends Location {
    create(key) {
        let fileData = this.engine.storyData.Files[key];
        this.engine.show(fileData.Body);
        this.engine.addChoice(fileData.Next, fileData.Next);

        if (fileData.Key) {
            this.engine.storyData.Locations["Exit"].Choices[1].Lock = "Unlocked";
        }

    }
    
    handleChoice(choice) {
        
        this.engine.show("&gt; "+choice);

        if (choice == "Close Drawer") {
            this.engine.gotoScene(Location, "Office Room");
        } else {
            this.engine.gotoScene(FilesInteraction, choice);
        }
    }
    
}

Engine.load(Start, 'myStory.json');