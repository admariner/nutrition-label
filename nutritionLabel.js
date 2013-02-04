/******************************************
 * NUTRITIONIX.com
 *
 * This plugin allows you to create a fully customizable nutrition label
 *
 * @authors			majin22 <leejay22@gmail.com> (js) and genesis23rd <genesis23rd@gmail.com> (css and html)
 * @copyright		Copyright (c) 2012 Nutritionix.
 * @license			This Nutritionix jQuery Nutrition Label is dual licensed under the MIT and GPL licenses.
 * @link				http://www.nutritionix.com
 * @github			http://github.com/nutritionix/nutrition-label
 * @version			1.0.0
 *
 ******************************************/

;(function($){
	$.fn.nutritionLabel = function(option, settings){
		if (typeof option === 'object'){
			settings = option;
			init( settings, $(this) );
		}else if (typeof option === 'string' && option != ''){
			//destroys the nutrition label's html code
			if (option == 'destroy')
				new NutritionLabel().destroy( $(this) );
			//allows the user to hide the nutrition value
			else if (option == 'hide')
				new NutritionLabel().hide( $(this) );
			//allows the user to show the nutrition value
			else if (option == 'show')
				new NutritionLabel().show( $(this) );
			else{
				var values = [];

				var elements = this.each(function(){
					var data = $(this).data('_nutritionLabel');
					if (data){
						if ($.fn.nutritionLabel.defaultSettings[option] !== undefined){
							if (settings !== undefined){
								//set the option and create the nutrition label
								data.settings[option] = settings;
								init( data.settings, $(this) );
							}else
								//return the value of a setting - can only be used after the label is created / initiated
								values.push(data.settings[option]);
						}
					}else if ($.fn.nutritionLabel.defaultSettings[option] !== undefined)
						//set the option and create the nutrition label
						//this is a special case so the single value setting will still work even if the label hasn't been initiated yet
						if (settings !== undefined){
							$.fn.nutritionLabel.defaultSettings[option] = settings;
							init( null, $(this) );
						}
				});

				//return the value of a setting
				if (values.length === 1)
					return values[0];

				//return the setting values or the elements
				return values.length > 0 ? values : elements;
			}
		}else if (typeof option === 'undefined' || option == '')
			//if no value / option is supplied, simply create the label using the default values
			init( settings, $(this) );
	}


	$.fn.nutritionLabel.defaultSettings = {
		//this is for not applicable values. this is used when you want to show the nutrition value (eg. calories) but show a not applicable icon instead of a value
		naImage : '../images/tiny-logo.png',
		//default width of the nutrition label
		width : 250,
		//allows the values: vit a, vit c, calcium and iron to be on top of each other and not side by side
		lowerNutritionSideBySide : true,
		//the name of the item for this label (eg. cheese burger or mayonnaise)
		itemName : 'Item / Ingredient Name',
		//to scroll the ingredients if the innerheight is > scrollHeightComparison
		scrollLongIngredients : false,
		scrollHeightComparison : 100,
		//the height in px of the ingredients div
		scrollHeightPixel : 95,
		//this is to set how many decimal places will be shown on the nutrition values (calories, fat, protein, vitamin a, iron, etc)
		decimalPlacesForNutrition : 1,
		//this is to set how many decimal places will be shown for the "% daily values*"
		decimalPlacesForDailyValues : 0,

		//show the home page print link
		showHomePrintLink : false,
		//url for the home page print link
		urlHomePrintLink : 'http://www.nutritionix.com',
		//link name for the home page print link
		nameHomePrintLink : 'Nutritionix',

		//default calorie intake
		calorieIntake : 2000,

		//these are the recommended daily intake values
		dailyValueTotalFat : 65,
		dailyValueSatFat : 20,
		dailyValueCholesterol : 300,
		dailyValueSodium : 2400,
		dailyValueCarb : 300,
		dailyValueFiber : 25,

		//these values can be change to hide some nutrition values
		showServingSize : true,
		showCalories : true,
		showFatCalories : true,
		showTotalFat : true,
		showSatFat : true,
		showTransFat : true,
		showPolyFat : true,
		showMonoFat : true,
		showCholesterol : true,
		showSodium : true,
		showTotalCarb : true,
		showFibers : true,
		showSugars : true,
		showProteins : true,
		showVitaminA : true,
		showVitaminC : true,
		showCalcium : true,
		showIron : true,

		//to show the 'amount per serving' text
		showAmountPerServing : true,
		//to show the 'servings per container' data and replace the default 'Serving Size' value (without unit and servings per container text and value)
		showServingsPerContainer : false,
		//to show the item name. there are special cases where the item name is replaced with 'servings per container' value
		showItemName : true,
		//to show the ingredients value or not
		showIngredients : true,
		//to show the disclaimer text or not
		showDisclaimer : true,

		//the are to set some values as 'not applicable'. this means that the nutrition label will appear but the value will be a 'N/A image'
		naServingSize : false,
		naCalories : false,
		naFatCalories : false,
		naTotalFat : false,
		naSatFat : false,
		naTransFat : false,
		naPolyFat : false,
		naMonoFat : false,
		naCholesterol : false,
		naSodium : false,
		naTotalCarb : false,
		naFibers : false,
		naSugars : false,
		naProteins : false,
		naVitaminA : false,
		naVitaminC : false,
		naCalcium : false,
		naIron : false,

		//these are the default values for the nutrition info
		valueServingSize : 0,
		valueServingSizeUnit : '',
		valueServingPerContainer : 1,
		valueCalories : 0,
		valueFatCalories : 0,
		valueTotalFat : 0,
		valueSatFat : 0,
		valueTransFat : 0,
		valuePolyFat : 0,
		valueMonoFat : 0,
		valueCholesterol : 0,
		valueSodium : 0,
		valueTotalCarb : 0,
		valueFibers : 0,
		valueSugars : 0,
		valueProteins : 0,
		valueVitaminA : 0,
		valueVitaminC : 0,
		valueCalcium : 0,
		valueIron : 0,

		//these text settings is so you can create nutrition labels in different languages or to simply change them to your need
		textNutritionFacts : 'Nutrition Facts',
		textDailyValues : 'Daily Value',
		textServingSize : 'Serving Size',
		textServingsPerContainer : 'Servings Per Container',
		textAmountPerServing : 'Amount Per Serving',
		textCalories : 'Calories',
		textFatCalories : 'Calories from Fat',
		textTotalFat : 'Total Fat',
		textSatFat : 'Saturated Fat',
		textTransFat : '<i>Trans</i> Fat',
		textPolyFat : 'Polyunsaturated Fat',
		textMonoFat : 'Monounsaturated Fat',
		textCholesterol : 'Cholesterol',
		textSodium : 'Sodium',
		textTotalCarb : 'Total Carbohydrates',
		textFibers : 'Dietary Fiber',
		textSugars : 'Sugars',
		textProteins : 'Protein',
		textVitaminA : 'Vitamin A',
		textVitaminC : 'Vitamin C',
		textCalcium : 'Calcium',
		textIron : 'Iron',
		ingredientLabel : 'INGREDIENTS:',
		ingredientList : 'None',
		disclaimer : 'Please note that these nutrition values are estimated based on our standard serving portions.  As food servings may have a slight variance each time you visit, please expect these values to be with in 10% +/- of your actual meal.  If you have any questions about our nutrition calculator, please contact Nutritionix.',
		textPercentDailyPart1 : 'Percent Daily Values are based on a',
		textPercentDailyPart2 : 'calorie diet'
	};


	// this will store the unique individual properties for each instance of the plugin
	function NutritionLabel(settings, $elem){
		this.nutritionLabel = null;
		this.settings = settings;
		this.$elem = $elem;

		return this;
	}


	function init(settings, $elem){
		//initalize the nutrition label and create / recreate it
		var $settings = $.extend( {}, $.fn.nutritionLabel.defaultSettings, settings || {} );

		var nutritionLabel = new NutritionLabel($settings, $elem);
		$elem.html( nutritionLabel.generate() );

		//scroll the ingredients of the innerheight is > $settings.scrollHeightComparison
			//and the settings showIngredients and scrollLongIngredients are true
		if ($settings.showIngredients && $settings.scrollLongIngredients){
			if ($elem.attr('id') != undefined && $elem.attr('id') != '')
				//this code is for pages with multiple nutrition labels generated by the plugin like the demo page
				$ingredientListParent = $('#'+$elem.attr('id')+' #ingredientList').parent();
			else
				$ingredientListParent = $('#ingredientList').parent();
			if ($ingredientListParent.innerHeight() > $settings.scrollHeightComparison)
				$ingredientListParent.css({
					'height' : $settings.scrollHeightPixel+'px',
					'width' : '100%',
					'overflow-y' : 'scroll'
				});
		}

		// store the object for later reference
		$elem.data('_nutritionLabel', nutritionLabel);
	}


	NutritionLabel.prototype = {
		generate: function(){
			//this is the function that returns the html code for the nutrition label based on the settings that is supplied by the user
			var $this = this;

			// return the plugin incase it has already been created
			if ($this.nutritionLabel)
				return $this.nutritionLabel;

			//initializing the tab variables
			//tab variables are used to make the printing of the html code readable when you copy the code using
				//firebug => inspect => copy innerhtml
			//for debugging and editing purposes
			for (x = 1; x < 9; x++){
				var tab = '';
				for (y = 1; y <= x; y++)
					tab += '\t';
				eval('var tab' + x + ' = "' + tab + '";');
			}

			//initialize the not applicable image icon in case we need to use it
			var naValue = tab6 + '<img src="'+ $this.settings.naImage +'" alt="N/A" class="nix-tiny-logo" />\n';

			var calorieIntakeMod = (parseFloat($this.settings.calorieIntake) / 2000).toFixed(2);

			//this is a straighforward code - creates the html code for the label based on the settings
			var nutritionLabel = '<div class="nutritionLabel" style="width: '+ $this.settings.width +'px;">\n';
					nutritionLabel += tab2 + '<div class="title">' + $this.settings.textNutritionFacts + '</div>\n';

						if ($this.settings.showServingSize){
							//hideServings is a special variable on the save meal pages
							nutritionLabel += tab4 + '<div class="serving">\n';

							if (!$this.settings.showServingsPerContainer){
								nutritionLabel += tab5 + '<div>' + $this.settings.textServingSize + '\n';
									nutritionLabel += tab6 + ($this.settings.naServingSize ? naValue : $this.settings.valueServingSize.toFixed($this.settings.decimalPlacesForNutrition) ) + '\n';
								nutritionLabel += tab5 + '</div>\n';
							}else{
								// Serving size
								nutritionLabel += tab5 + '<div>' + $this.settings.textServingSize + '\n';
									nutritionLabel += tab6 + ($this.settings.naServingSize ? naValue : $this.settings.valueServingSize.toFixed($this.settings.decimalPlacesForNutrition) ) +' '+ $this.settings.valueServingSizeUnit + '\n';
								nutritionLabel += tab5 + '</div>\n';
								// Serving per container
								nutritionLabel += tab5 + '<div>' + $this.settings.textServingsPerContainer + '\n';
									nutritionLabel += tab6 + $this.settings.valueServingPerContainer.toFixed($this.settings.decimalPlacesForNutrition) + '\n';
								nutritionLabel += tab5 + '</div>\n';
							}
							nutritionLabel += tab4 + '</div>\n';
						}

						if ($this.settings.showItemName)
							nutritionLabel += tab4 + '<div class="name">' + $this.settings.itemName + '</div>\n';

						nutritionLabel += tab3 + '<div class="bar1"></div>\n';


				if ($this.settings.showAmountPerServing){
					nutritionLabel += tab2 + '<div class="line m">';
						nutritionLabel += tab3 + '<b>' + $this.settings.textAmountPerServing + '</b>\n';
					nutritionLabel += tab2 + '</div>\n';
				}

				nutritionLabel += tab2 + '<div class="line">\n';

							if ($this.settings.showFatCalories){
								nutritionLabel += tab3 + '<div class="fr">\n';
									nutritionLabel += tab4 + $this.settings.textFatCalories + '\n';
										nutritionLabel += tab5 + (
											$this.settings.naFatCalories ?
												naValue :
												(
													jQuery.type($this.settings.valueFatCalories) == 'string' ?
														$this.settings.valueFatCalories :
														$this.settings.valueFatCalories.toFixed($this.settings.decimalPlacesForNutrition)
												)
											) + '\n';
								nutritionLabel += tab3 + '</div>\n';
							}

							if ($this.settings.showCalories){
								nutritionLabel += tab3 + '<div>\n';
									nutritionLabel += tab4 + '<b>' + $this.settings.textCalories + '</b>\n';
										nutritionLabel += tab5 + (
											$this.settings.naCalories ?
												naValue :
												(
													jQuery.type($this.settings.valueCalories) == 'string' ?
														$this.settings.valueCalories :
														$this.settings.valueCalories.toFixed($this.settings.decimalPlacesForNutrition)
												)
											) + '\n';
								nutritionLabel += tab3 + '</div>\n';
							}

					nutritionLabel += tab2 + '</div>\n';
					nutritionLabel += tab2 + '<div class="bar2"></div>';

					nutritionLabel += tab5 + '<div class="line ar">\n';
						nutritionLabel += tab6 + '<b>% ' + $this.settings.textDailyValues + '<sup>*</sup></b>\n';
					nutritionLabel += tab5 + '</div>\n';


				if ($this.settings.showTotalFat){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<div class="dv">\n';
							nutritionLabel += $this.settings.naTotalFat ?
								naValue :
								tab6 + '<b>' + (
									jQuery.type($this.settings.valueTotalFat) == 'string' ?
									0 : parseFloat( ($this.settings.valueTotalFat / ($this.settings.dailyValueTotalFat * calorieIntakeMod) ) * 100 ).toFixed($this.settings.decimalPlacesForDailyValues)
								) + '</b>%\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + '<b>' + $this.settings.textTotalFat + '</b>\n';
							nutritionLabel +=
								(	$this.settings.naTotalFat ?
									naValue :
									(
										jQuery.type($this.settings.valueTotalFat) == 'string' ?
											$this.settings.valueTotalFat :
											$this.settings.valueTotalFat.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
									)
								) + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}

				if ($this.settings.showSatFat){
					nutritionLabel += tab2 + '<div class="line indent">';
						nutritionLabel += tab3 + '<div class="dv">\n';
							nutritionLabel += $this.settings.naSatFat ?
								naValue :
								tab6 + '<b>' + (
									jQuery.type($this.settings.valueSatFat) == 'string' ?
									0 : parseFloat( ($this.settings.valueSatFat / ($this.settings.dailyValueSatFat * calorieIntakeMod) ) * 100 ).toFixed($this.settings.decimalPlacesForDailyValues)
								) + '</b>%\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + $this.settings.textSatFat + '\n';
										nutritionLabel +=
											( $this.settings.naSatFat ?
												naValue :
												(
													jQuery.type($this.settings.valueSatFat) == 'string' ?
														$this.settings.valueSatFat :
														$this.settings.valueSatFat.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
												)
											) + '\n';
						nutritionLabel += tab2 + '</div>\n';
				}

				if ($this.settings.showTransFat){
					nutritionLabel += tab2 + '<div class="line indent">';
						nutritionLabel += tab3 + $this.settings.textTransFat + '\n';
										nutritionLabel +=
											( $this.settings.naTransFat ?
												naValue :
												(
													jQuery.type($this.settings.valueTransFat) == 'string' ?
														$this.settings.valueTransFat :
														$this.settings.valueTransFat.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
												)
											) + '\n';
						nutritionLabel += tab2 + '</div>\n';
				}

				if ($this.settings.showPolyFat){
					nutritionLabel += tab2 + '<div class="line indent">';
						nutritionLabel += tab3 + $this.settings.textPolyFat + '\n';
										nutritionLabel +=
											( $this.settings.naPolyFat ?
												naValue :
												(
													jQuery.type($this.settings.valuePolyFat) == 'string' ?
														$this.settings.valuePolyFat :
														$this.settings.valuePolyFat.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
												)
											) + '\n';
						nutritionLabel += tab2 + '</div>\n';
				}

				if ($this.settings.showMonoFat){
					nutritionLabel += tab2 + '<div class="line indent">';
						nutritionLabel += tab3 + $this.settings.textMonoFat + '\n';
										nutritionLabel +=
											( $this.settings.naMonoFat ?
												naValue :
												(
													jQuery.type($this.settings.valueMonoFat) == 'string' ?
														$this.settings.valueMonoFat :
														$this.settings.valueMonoFat.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
												)
											) + '\n';
						nutritionLabel += tab2 + '</div>\n';
				}


				if ($this.settings.showCholesterol){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<div class="dv">\n';
							nutritionLabel += $this.settings.naCholesterol ?
								naValue :
								tab6 + '<b>' + (
									jQuery.type($this.settings.valueCholesterol) == 'string' ?
									0 : parseFloat( ($this.settings.valueCholesterol / ($this.settings.dailyValueCholesterol * calorieIntakeMod) ) * 100 ).toFixed($this.settings.decimalPlacesForDailyValues)
								) + '</b>%\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + '<b>' + $this.settings.textCholesterol + '</b>\n';
							nutritionLabel +=
								(	$this.settings.naCholesterol ?
									naValue :
									(
										jQuery.type($this.settings.valueCholesterol) == 'string' ?
											$this.settings.valueCholesterol :
											$this.settings.valueCholesterol.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
									)
								) + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}


				if ($this.settings.showSodium){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<div class="dv">\n';
							nutritionLabel += $this.settings.naSodium ?
								naValue :
								tab6 + '<b>' + (
									jQuery.type($this.settings.valueSodium) == 'string' ?
									0 : parseFloat( ($this.settings.valueSodium / ($this.settings.dailyValueSodium * calorieIntakeMod) ) * 100 ).toFixed($this.settings.decimalPlacesForDailyValues)
								) + '</b>%\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + '<b>' + $this.settings.textSodium + '</b>\n';
							nutritionLabel +=
								(	$this.settings.naSodium ?
									naValue :
									(
										jQuery.type($this.settings.valueSodium) == 'string' ?
											$this.settings.valueSodium :
											$this.settings.valueSodium.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
									)
								) + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}


				if ($this.settings.showTotalCarb){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<div class="dv">\n';
							nutritionLabel += $this.settings.naTotalCarb ?
								naValue :
								tab6 + '<b>' + (
									jQuery.type($this.settings.valueTotalCarb) == 'string' ?
									0 : parseFloat( ($this.settings.valueTotalCarb / ($this.settings.dailyValueCarb * calorieIntakeMod) ) * 100 ).toFixed($this.settings.decimalPlacesForDailyValues)
								) + '</b>%\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + '<b>' + $this.settings.textTotalCarb + '</b>\n';
							nutritionLabel +=
								(	$this.settings.naTotalCarb ?
									naValue :
									(
										jQuery.type($this.settings.valueTotalCarb) == 'string' ?
											$this.settings.valueTotalCarb :
											$this.settings.valueTotalCarb.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
									)
								) + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}

				if ($this.settings.showFibers){
					nutritionLabel += tab2 + '<div class="line indent">';
						nutritionLabel += tab3 + '<div class="dv">\n';
							nutritionLabel += $this.settings.naFibers ?
								naValue :
								tab6 + '<b>' + (
									jQuery.type($this.settings.valueFibers) == 'string' ?
									0 : parseFloat( ($this.settings.valueFibers / ($this.settings.dailyValueFiber * calorieIntakeMod) ) * 100 ).toFixed($this.settings.decimalPlacesForDailyValues)
								) + '</b>%\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + $this.settings.textFibers + '\n';
							nutritionLabel +=
								(	$this.settings.naFibers ?
									naValue :
									(
										jQuery.type($this.settings.valueFibers) == 'string' ?
											$this.settings.valueFibers :
											$this.settings.valueFibers.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
									)
								) + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}


				if ($this.settings.showSugars){
					nutritionLabel += tab2 + '<div class="line indent">';
						nutritionLabel += tab3 + $this.settings.textSugars + '\n';
										nutritionLabel +=
											( $this.settings.naSugars ?
												naValue :
												(
													jQuery.type($this.settings.valueSugars) == 'string' ?
														$this.settings.valueSugars :
														$this.settings.valueSugars.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
												)
											) + '\n';
						nutritionLabel += tab2 + '</div>\n';
				}


				if ($this.settings.showProteins){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<b>' + $this.settings.textProteins + '</b>\n';
										nutritionLabel +=
											( $this.settings.naProteins ?
												naValue :
												(
													jQuery.type($this.settings.valueProteins) == 'string' ?
														$this.settings.valueProteins :
														$this.settings.valueProteins.toFixed($this.settings.decimalPlacesForNutrition) + 'g'
												)
											) + '\n';
						nutritionLabel += tab2 + '</div>\n';
				}


				nutritionLabel += tab2 + '<div class="bar1"></div>\n';



				if ($this.settings.showVitaminA){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<div class="dv">\n';
						nutritionLabel +=
							( $this.settings.naVitaminA ?
								naValue :
								(
									jQuery.type($this.settings.valueVitaminA) == 'string' ?
										$this.settings.valueVitaminA :
										$this.settings.valueVitaminA.toFixed($this.settings.decimalPlacesForNutrition) + '%'
								)
							) + '\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + $this.settings.textVitaminA + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}

				if ($this.settings.showVitaminC){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<div class="dv">\n';
						nutritionLabel +=
							( $this.settings.naVitaminC ?
								naValue :
								(
									jQuery.type($this.settings.valueVitaminC) == 'string' ?
										$this.settings.valueVitaminC :
										$this.settings.valueVitaminC.toFixed($this.settings.decimalPlacesForNutrition) + '%'
								)
							) + '\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + $this.settings.textVitaminC + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}

				if ($this.settings.showCalcium){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<div class="dv">\n';
						nutritionLabel +=
							( $this.settings.naCalcium ?
								naValue :
								(
									jQuery.type($this.settings.valueCalcium) == 'string' ?
										$this.settings.valueCalcium :
										$this.settings.valueCalcium.toFixed($this.settings.decimalPlacesForNutrition) + '%'
								)
							) + '\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + $this.settings.textCalcium + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}

				if ($this.settings.showIron){
					nutritionLabel += tab2 + '<div class="line">';
						nutritionLabel += tab3 + '<div class="dv">\n';
						nutritionLabel +=
							( $this.settings.naIron ?
								naValue :
								(
									jQuery.type($this.settings.valueIron) == 'string' ?
										$this.settings.valueIron :
										$this.settings.valueIron.toFixed($this.settings.decimalPlacesForNutrition) + '%'
								)
							) + '\n';
						nutritionLabel += tab3 + '</div>\n';
						nutritionLabel += tab3 + $this.settings.textIron + '\n';
					nutritionLabel += tab2 + '</div>\n';
				}



				nutritionLabel += tab2 + '<div class="dvCalorieDiet">\n';
					nutritionLabel += tab3 + '<div class="calorieNote">\n';
						nutritionLabel += tab4 + '<span class="star">*</span> ' + $this.settings.textPercentDailyPart1 + ' ' + $this.settings.calorieIntake + ' ' + $this.settings.textPercentDailyPart2 + '.\n';

						if ($this.settings.showIngredients){
							nutritionLabel += tab4 + '<br /><b class="active">' + $this.settings.ingredientLabel + '</b>\n';
							nutritionLabel += tab4 + $this.settings.ingredientList + '\n';
						}

					nutritionLabel += tab3 + '</div>\n';
				nutritionLabel += tab3 + '</div>\n';


				if ($this.settings.showDisclaimer){
					nutritionLabel += tab4 + '<div class="labellight dvlabel2 alignC" id="calcDisclaimer">\n';
						nutritionLabel += tab5 + '<span id="calcDisclaimerText">' + $this.settings.disclaimer + '</span>\n';
					nutritionLabel += tab4 + '</div>\n';
				}


				if ($this.settings.showHomePrintLink){
					nutritionLabel += tab2 + '<tr>\n';
						nutritionLabel += tab3 + '<td colspan="2" class="linkTD">\n';
							nutritionLabel += tab4 + '<div class="spaceAbove"></div>\n';
							nutritionLabel += tab4 + '<a href="' + $this.settings.urlHomePrintLink + '" target="_newSite" class="homeLinkPrint">' + $this.settings.nameHomePrintLink + '</a>\n';
							nutritionLabel += tab4 + '<div class="spaceBelow"></div>\n';
						nutritionLabel += tab3 + '</td>\n';
					nutritionLabel += tab2 + '</tr>\n';
				}

				nutritionLabel += tab1 + '</table>\n';
			nutritionLabel += '</div>\n';

			//returns the html for the nutrition label
			return nutritionLabel;
		},

		destroy: function($this){
			$this.html('');
		},
		hide: function($this){
			$this.hide();
		},
		show: function($this){
			$this.show();
		}

	}
})(jQuery);