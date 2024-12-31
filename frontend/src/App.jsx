// App.jsx
import MainLayout from "./components/layout/MainLayout";
import WorkoutCard from "./components/cards/WorkoutCard";

function App() {
  return (
    <MainLayout>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-physio-chocolate">Wilkommen bei PhysioApp</h1>

        <div className="mt-8">
          <WorkoutCard
            image="PlaceholderPhysioApp.svg"
            title="Test Übung"
            startingPosition={["Aufrechter Stand"]}
            execution={["Knie beugen", "Wieder aufrichten"]}
            endPosition={["Aufrechter Stand"]}
            repetitions="3x10"
            note="Auf gerade Haltung achten"
            isFavorite={true}
            isWorkoutPlan={false}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
