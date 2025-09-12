import React, { useState, useEffect } from 'react';

const NutritionAdvisor = () => {
    const [mealRecords, setMealRecords] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [todayMeal, setTodayMeal] = useState({
        breakfast: '',
        lunch: '',
        snacks: '',
        special_dish: ''
    });

    // Nutrition guidelines by age group
    const nutritionGuidelines = [
        {
            ageGroup: '6-12 months',
            foods: [
                'Breast milk/formula + complementary foods',
                'Mashed fruits (banana, chikoo)',
                'Soft cooked vegetables (potato, carrot)',
                'Rice porridge with dal',
                'Suji kheer/halwa'
            ],
            tips: [
                'Start with 2-3 meals per day',
                'Introduce one new food at a time',
                'Ensure food is soft and mashed properly',
                'Maintain breastfeeding on demand'
            ]
        },
        {
            ageGroup: '1-3 years',
            foods: [
                'Whole grains (roti, rice)',
                'Dal and pulses',
                'Vegetables (all types)',
                'Fruits (seasonal)',
                'Milk and dairy products',
                'Eggs (if non-vegetarian)'
            ],
            tips: [
                '3 main meals + 2 snacks daily',
                'Offer variety of colors and textures',
                'Ensure adequate protein intake',
                'Limit sugary foods and drinks'
            ]
        },
        {
            ageGroup: '3-6 years',
            foods: [
                'Balanced family foods',
                'Green leafy vegetables',
                'Fresh fruits',
                'Milk and curd',
                'Nuts and seeds (properly crushed)',
                'Eggs, chicken, fish (if non-vegetarian)'
            ],
            tips: [
                '4-5 meals per day',
                'Encourage self-feeding',
                'Make meals colorful and fun',
                'Ensure calcium for bone growth'
            ]
        }
    ];

    // Sample weekly menu plan
    const weeklyMenu = [
        {
            day: 'Monday',
            breakfast: 'Suji upma with vegetables',
            lunch: 'Rice + sambar + potato fry',
            snacks: 'Banana + milk',
            special: 'Carrot halwa'
        },
        {
            day: 'Tuesday',
            breakfast: 'Poha with peanuts',
            lunch: 'Roti + dal + cabbage curry',
            snacks: 'Orange segments',
            special: 'Besan ladoo'
        },
        {
            day: 'Wednesday',
            breakfast: 'Idli with sambar',
            lunch: 'Rice + rasam + beans curry',
            snacks: 'Puffed rice mixture',
            special: 'Fruit custard'
        },
        {
            day: 'Thursday',
            breakfast: 'Vegetable sandwich',
            lunch: 'Khichdi with potato',
            snacks: 'Apple slices',
            special: 'Sewaiyan'
        },
        {
            day: 'Friday',
            breakfast: 'Dalia with vegetables',
            lunch: 'Roti + chole + rice',
            snacks: 'Papaya pieces',
            special: 'Jaggery sweet'
        },
        {
            day: 'Saturday',
            breakfast: 'Utappam with chutney',
            lunch: 'Rice + dal + bhindi curry',
            snacks: 'Groundnut chikki',
            special: 'Rava kesari'
        }
    ];

    // Load data from localStorage
    useEffect(() => {
        const savedMeals = JSON.parse(localStorage.getItem('anganwadiMeals')) || {};
        setMealRecords(savedMeals);
    }, []);

    // Save meal records to localStorage
    useEffect(() => {
        localStorage.setItem('anganwadiMeals', JSON.stringify(mealRecords));
    }, [mealRecords]);

    // Get formatted date string
    const getDateString = (date) => {
        return date.toISOString().split('T')[0];
    };

    const todayString = getDateString(currentDate);

    // Handle meal input changes
    const handleMealChange = (mealType, value) => {
        setTodayMeal(prev => ({
            ...prev,
            [mealType]: value
        }));
    };

    // Save today's meals
    const saveTodayMeals = () => {
        if (todayMeal.breakfast.trim() || todayMeal.lunch.trim() || todayMeal.snacks.trim()) {
            setMealRecords(prev => ({
                ...prev,
                [todayString]: todayMeal
            }));

            setTodayMeal({
                breakfast: '',
                lunch: '',
                snacks: '',
                special_dish: ''
            });

            alert('✅ Today\'s meals saved successfully!');
        }
    };

    // Check if meals are already recorded for today
    const isTodayRecorded = mealRecords[todayString];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Nutrition Advisor</h1>

            {/* Daily Meal Tracking */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Today's Meals - {currentDate.toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h2>

                {isTodayRecorded ? (
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <p className="text-green-700 font-semibold">✅ Meals already recorded for today!</p>
                        <div className="mt-2">
                            <p><strong>Breakfast:</strong> {mealRecords[todayString].breakfast || 'Not specified'}</p>
                            <p><strong>Lunch:</strong> {mealRecords[todayString].lunch || 'Not specified'}</p>
                            <p><strong>Snacks:</strong> {mealRecords[todayString].snacks || 'Not specified'}</p>
                            <p><strong>Special Dish:</strong> {mealRecords[todayString].special_dish || 'None'}</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Breakfast</label>
                            <input
                                type="text"
                                value={todayMeal.breakfast}
                                onChange={(e) => handleMealChange('breakfast', e.target.value)}
                                placeholder="What was served for breakfast?"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Lunch</label>
                            <input
                                type="text"
                                value={todayMeal.lunch}
                                onChange={(e) => handleMealChange('lunch', e.target.value)}
                                placeholder="What was served for lunch?"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Evening Snacks</label>
                            <input
                                type="text"
                                value={todayMeal.snacks}
                                onChange={(e) => handleMealChange('snacks', e.target.value)}
                                placeholder="What snacks were provided?"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Special Dish (Optional)</label>
                            <input
                                type="text"
                                value={todayMeal.special_dish}
                                onChange={(e) => handleMealChange('special_dish', e.target.value)}
                                placeholder="Any special dish today?"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <button
                            onClick={saveTodayMeals}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            Save Today's Meals
                        </button>
                    </div>
                )}
            </div>

            {/* Weekly Menu Plan */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Weekly Menu Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {weeklyMenu.map((dayPlan, index) => (
                        <div key={index} className="border border-green-200 p-4 rounded-lg">
                            <h3 className="font-semibold text-green-800 mb-2">{dayPlan.day}</h3>
                            <p><strong>Breakfast:</strong> {dayPlan.breakfast}</p>
                            <p><strong>Lunch:</strong> {dayPlan.lunch}</p>
                            <p><strong>Snacks:</strong> {dayPlan.snacks}</p>
                            <p><strong>Special:</strong> {dayPlan.special}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nutrition Guidelines */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Nutrition Guidelines by Age Group</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {nutritionGuidelines.map((guideline, index) => (
                        <div key={index} className="border border-blue-200 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-3">{guideline.ageGroup}</h3>

                            <h4 className="font-medium mb-2">Recommended Foods:</h4>
                            <ul className="list-disc list-inside text-sm mb-3 space-y-1">
                                {guideline.foods.map((food, i) => (
                                    <li key={i}>{food}</li>
                                ))}
                            </ul>

                            <h4 className="font-medium mb-2">Tips:</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                {guideline.tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Meal History */}
            {Object.keys(mealRecords).length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Meal History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-green-100">
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Breakfast</th>
                                    <th className="px-4 py-2 text-left">Lunch</th>
                                    <th className="px-4 py-2 text-left">Snacks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(mealRecords)
                                    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                                    .slice(0, 5)
                                    .map(([date, meals]) => (
                                        <tr key={date} className="border-b">
                                            <td className="px-4 py-2">{new Date(date).toLocaleDateString('en-IN')}</td>
                                            <td className="px-4 py-2">{meals.breakfast || '-'}</td>
                                            <td className="px-4 py-2">{meals.lunch || '-'}</td>
                                            <td className="px-4 py-2">{meals.snacks || '-'}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NutritionAdvisor;