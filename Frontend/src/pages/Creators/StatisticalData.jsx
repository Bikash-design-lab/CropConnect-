import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticalData = () => {
    const overallData = {
        labels: [
            "Total Cultivators",
            "Agricultural Laborers",
            "Affected by Middlemen",
            "Unable to Direct Sell",
        ],
        datasets: [
            {
                label: "Number of Farmers (in millions)",
                data: [119, 144, 226, 226],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 206, 86, 0.7)",
                    "rgba(255, 99, 132, 0.7)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const overallOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Farmer Statistics in India (2025, in millions)`,
            },
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.parsed.y} million`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: "Number of Farmers" },
            },
            x: {
                title: { display: true, text: "" },
            },
        },
    };

    const states = [
        "Uttar P.",
        "Bihar",
        "Maharashtra",
        "Madhya P.",
        "Andhra P.",
        "Karnataka",
        "Tamil Nadu",
        "Rajasthan",
        "West B.",
        "Odisha",
    ];

    const affectedMiddlemen = [88, 90, 85, 83, 80, 79, 76, 73, 70, 68];
    const affectedStorage = [75, 78, 70, 72, 65, 60, 59, 55, 53, 50];

    const stateData = {
        labels: states,
        datasets: [
            {
                label: "Affected by Middlemen (%)",
                data: affectedMiddlemen,
                backgroundColor: "rgba(255, 99, 132, 0.7)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Affected by Storage Issues (%)",
                data: affectedStorage,
                backgroundColor: "rgba(54, 162, 235, 0.7)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const stateOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Top 10 Indian States: Farmers Affected by Middlemen & Storage Issues (2025)",
            },
            legend: { position: "top" },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.parsed.y || context.parsed.x}%`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: "% Farmer Impact" },
            },
        },
    };

    return (
        <div className="grid bg-white grid-cols-1 md:grid-cols-2 gap-8 max-w-[1400px] mx-auto p-5">
            {/* Overall chart */}
            <div className="w-full flex flex-col items-center">
                <div className="w-full h-96">
                    <Bar data={overallData} options={overallOptions} />
                </div>
                <p className="text-green-700 mt-3 text-xs sm:text-sm text-center px-2">
                    Source: Ministry of Agriculture, UPAg, RBI, Statista (2025)
                </p>
            </div>

            {/* State-wise chart */}
            <div className="w-full  flex flex-col items-center">
                <div className="w-full h-96">
                    <Bar data={stateData} options={stateOptions} />
                </div>
                <p className="text-green-600 mt-3 text-xs sm:text-sm text-center px-2">
                    Source: India Data Map, Ministry of Agriculture, RBI, Farmonaut (2025)
                </p>
            </div>
        </div>
    );
};

export default StatisticalData;
