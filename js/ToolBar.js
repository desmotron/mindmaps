var ToolBarView = function() {
	var self = this;

	this.init = function() {
		$("#toolbar button").button();
		$("#toolbar .buttonset").buttonset();

		$("#button-delete").click(function() {
			if (self.deleteButtonClicked) {
				self.deleteButtonClicked();
			}
		});

		$("#button-undo").button("disable");
		$("#button-redo").button("disable");

		$("#button-new").click(function() {
			if (self.newButtonClicked) {
				self.newButtonClicked();
			}
		});

		$("#button-open").click(function() {
			if (self.openButtonClicked) {
				self.openButtonClicked();
			}
		});

		$("#button-save").button("option", "icons", {
			primary : "ui-icon-disk"
		});

		$("#button-save").click(function() {
			if (self.saveButtonClicked) {
				self.saveButtonClicked();
			}
		});

		$("#button-close").button("option", "icons", {
			primary : "ui-icon-circle-close"
		});

		$("#button-draw").button();
	};

	/**
	 * Disable button for a little while show text that we just saved.
	 */
	this.showSaved = function() {
		var timeout = 2000;
		var saveButton = $("#button-save");
		
		saveButton.button("option", {
			disabled : true,
			label : "saved"
		});

		setTimeout(function() {
			saveButton.button("option", {
				disabled : false,
				label : "save"
			});
		}, timeout);
	};
};

var ToolBarPresenter = function(eventBus, view) {
	// view callbacks
	view.deleteButtonClicked = function() {
		eventBus.publish(Event.DELETE_SELECTED_NODE);
	};

	view.saveButtonClicked = function() {
		eventBus.publish(Event.SAVE_DOCUMENT);
	};

	view.openButtonClicked = function() {
		eventBus.publish(Event.OPEN_DOCUMENT);
	};

	view.newButtonClicked = function() {
		eventBus.publish(Event.NEW_DOCUMENT);
	};

	// global events
	eventBus.subscribe(Event.DOCUMENT_SAVED, function() {
		view.showSaved();
	});

	this.go = function() {
		view.init();
	};
};