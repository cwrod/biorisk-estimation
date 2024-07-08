import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Settings, X, Plus, Trash2, RefreshCw, RotateCcw, Download, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, LineChart, Line, ScatterChart, Scatter, ZAxis } from 'recharts';



const AppLayout = () => {
  // Score matrices
  const defaultScoreMatrices = {
  student_internet: [
	[0, 2, 1, 3, 1], [10, 9, 3, 3, 3], [9, 1, 3, 6, 3], [2, 6, 1, 3, 3], [8, 4, 1, 6, 2], [7, 1, 5, 6, 2], [6, 1, 4, 4, 3], [10, 6, 3, 1, 6], [9, 6, 3, 1, 3], [9, 7, 6, 3, 8], [8, 6, 3, 4, 6], [0, 1, 1, 6, 2], [10, 1, 1, 0, 3], [8, 1, 5, 3, 2], [0, 1, 1, 6, 4], [5, 1, 3, 1, 3], [8, 1, 1, 4, 2], [7, 3, 3, 5, 3], [6, 6, 2, 0, 4], [8, 1, 5, 0, 2], [2, 1, 1, 4, 3], [8, 5, 2, 4, 3], [9, 2, 1, 1, 2], [10, 2, 3, 3, 3], [10, 6, 1, 1, 2]
  ],
  student_llm: [
  	[0, 1, 5, 4, 3], [8, 1, 5, 3, 1], [10, 3, 1, 6, 6], [0, 4, 1, 1, 3], [10, 1, 1, 5, 6], [9, 2, 4, 4, 2], [2, 1, 7, 7, 3], [8, 1, 1, 1, 1], [9, 1, 3, 1, 2], [9, 3, 1, 4, 8], [8, 1, 4, 6, 1], [2, 1, 1, 0, 3], [10, 6, 3, 5, 2], [7, 2, 5, 4, 6], [9, 6, 1, 6, 2], [9, 1, 5, 4, 3], [8, 1, 4, 6, 8], [7, 1, 8, 5, 4], [8, 1, 4, 4, 4], [10, 1, 3, 1, 3], [8, 2, 8, 6, 2], [8, 4, 5, 6, 3], [8, 5, 5, 6, 3], [0, 3, 1, 1, 2], [8, 1, 1, 4, 3]
  ],
  expert_internet: [
	[8, 1, 3, 3, 3], [8, 2, 5, 4, 2], [8, 6, 4, 4, 3], [7, 5, 4, 4, 4], [8, 1, 3, 6, 6], [0, 2, 4, 4, 2], [8, 8, 4, 6, 8], [10, 1, 1, 1, 3], [4, 7, 3, 3, 4], [2, 1, 3, 4, 2], [8, 2, 4, 5, 3], [8, 6, 4, 8, 3], [8, 6, 5, 1, 3], [7, 2, 3, 4, 2], [0, 1, 5, 5, 3], [10, 1, 3, 3, 2], [7, 2, 2, 1, 4], [0, 3, 3, 5, 2], [8, 9, 3, 4, 3], [10, 1, 4, 4, 3], [8, 3, 0, 5, 4], [10, 8, 5, 3, 3], [0, 0, 4, 4, 3], [8, 9, 4, 6, 4], [10, 1, 5, 5, 6]
  ],
  expert_llm: [
  	[7, 8, 4, 3, 6], [8, 1, 1, 4, 3], [2, 4, 5, 4, 3], [8, 6, 4, 4, 3], [8, 8, 4, 3, 2], [0, 9, 5, 8, 8], [8, 4, 3, 6, 2], [10, 2, 3, 4, 2], [8, 6, 5, 6, 8], [9, 5, 5, 4, 6], [10, 8, 4, 5, 3], [10, 8, 8, 5, 3], [2, 6, 4, 7, 8], [8, 1, 8, 4, 8], [8, 0, 3, 6, 3], [9, 3, 7, 3, 3], [8, 6, 3, 3, 3], [7, 6, 5, 8, 8], [10, 8, 9, 7, 2], [7, 1, 3, 4, 3], [9, 1, 5, 6, 3], [10, 6, 5, 9, 2], [9, 2, 5, 4, 3], [8, 1, 5, 4, 4], [0, 9, 3, 8, 3]
  ]
  };

  const [scoreMatrices, setScoreMatrices] = useState({
  student_internet: [
	[0, 2, 1, 3, 1], [10, 9, 3, 3, 3], [9, 1, 3, 6, 3], [2, 6, 1, 3, 3], [8, 4, 1, 6, 2], [7, 1, 5, 6, 2], [6, 1, 4, 4, 3], [10, 6, 3, 1, 6], [9, 6, 3, 1, 3], [9, 7, 6, 3, 8], [8, 6, 3, 4, 6], [0, 1, 1, 6, 2], [10, 1, 1, 0, 3], [8, 1, 5, 3, 2], [0, 1, 1, 6, 4], [5, 1, 3, 1, 3], [8, 1, 1, 4, 2], [7, 3, 3, 5, 3], [6, 6, 2, 0, 4], [8, 1, 5, 0, 2], [2, 1, 1, 4, 3], [8, 5, 2, 4, 3], [9, 2, 1, 1, 2], [10, 2, 3, 3, 3], [10, 6, 1, 1, 2]
  ],
  student_llm: [
  	[0, 1, 5, 4, 3], [8, 1, 5, 3, 1], [10, 3, 1, 6, 6], [0, 4, 1, 1, 3], [10, 1, 1, 5, 6], [9, 2, 4, 4, 2], [2, 1, 7, 7, 3], [8, 1, 1, 1, 1], [9, 1, 3, 1, 2], [9, 3, 1, 4, 8], [8, 1, 4, 6, 1], [2, 1, 1, 0, 3], [10, 6, 3, 5, 2], [7, 2, 5, 4, 6], [9, 6, 1, 6, 2], [9, 1, 5, 4, 3], [8, 1, 4, 6, 8], [7, 1, 8, 5, 4], [8, 1, 4, 4, 4], [10, 1, 3, 1, 3], [8, 2, 8, 6, 2], [8, 4, 5, 6, 3], [8, 5, 5, 6, 3], [0, 3, 1, 1, 2], [8, 1, 1, 4, 3]
  ],
  expert_internet: [
	[8, 1, 3, 3, 3], [8, 2, 5, 4, 2], [8, 6, 4, 4, 3], [7, 5, 4, 4, 4], [8, 1, 3, 6, 6], [0, 2, 4, 4, 2], [8, 8, 4, 6, 8], [10, 1, 1, 1, 3], [4, 7, 3, 3, 4], [2, 1, 3, 4, 2], [8, 2, 4, 5, 3], [8, 6, 4, 8, 3], [8, 6, 5, 1, 3], [7, 2, 3, 4, 2], [0, 1, 5, 5, 3], [10, 1, 3, 3, 2], [7, 2, 2, 1, 4], [0, 3, 3, 5, 2], [8, 9, 3, 4, 3], [10, 1, 4, 4, 3], [8, 3, 0, 5, 4], [10, 8, 5, 3, 3], [0, 0, 4, 4, 3], [8, 9, 4, 6, 4], [10, 1, 5, 5, 6]
  ],
  expert_llm: [
  	[7, 8, 4, 3, 6], [8, 1, 1, 4, 3], [2, 4, 5, 4, 3], [8, 6, 4, 4, 3], [8, 8, 4, 3, 2], [0, 9, 5, 8, 8], [8, 4, 3, 6, 2], [10, 2, 3, 4, 2], [8, 6, 5, 6, 8], [9, 5, 5, 4, 6], [10, 8, 4, 5, 3], [10, 8, 8, 5, 3], [2, 6, 4, 7, 8], [8, 1, 8, 4, 8], [8, 0, 3, 6, 3], [9, 3, 7, 3, 3], [8, 6, 3, 3, 3], [7, 6, 5, 8, 8], [10, 8, 9, 7, 2], [7, 1, 3, 4, 3], [9, 1, 5, 6, 3], [10, 6, 5, 9, 2], [9, 2, 5, 4, 3], [8, 1, 5, 4, 4], [0, 9, 3, 8, 3]
  ]
  });

  // State to track version for redrawing
  const [version, setVersion] = useState(0);

  // State to track the currently selected group
  const [selectedGroup, setSelectedGroup] = useState('student_internet');

  // State to track the currently selected preset
  const [selectedPreset, setSelectedPreset] = useState('Linear');

  // Preset mapping functions (to be filled in later)
  const presetFunctions = {
    Linear: {
      Ideation: 'x / 10',
      Acquisition: 'x / 10',
      Magnification: 'x / 10',
      Formulation: 'x / 10',
      Release: 'x / 10'
    },
    'Threshold 3': {
      Ideation: '0.5 + 0.5 * Math.tanh(0.5 * (x-3))',
      Acquisition: '0.5 + 0.5 * Math.tanh(0.5 * (x-3))',
      Magnification: '0.5 + 0.5 * Math.tanh(0.5 * (x-3))',
      Formulation: '0.5 + 0.5 * Math.tanh(0.5 * (x-3))',
      Release: '0.5 + 0.5 * Math.tanh(0.5 * (x-3))'
    },
    'Threshold 5': {
      Ideation: '0.5 + 0.5 * Math.tanh(0.5 * (x-5))',
      Acquisition: '0.5 + 0.5 * Math.tanh(0.5 * (x-5))',
      Magnification: '0.5 + 0.5 * Math.tanh(0.5 * (x-5))',
      Formulation: '0.5 + 0.5 * Math.tanh(0.5 * (x-5))',
      Release: '0.5 + 0.5 * Math.tanh(0.5 * (x-5))'
    },
    'Threshold 8': {
      Ideation: '0.5 + 0.5 * Math.tanh(0.5 * (x-8))',
      Acquisition: '0.5 + 0.5 * Math.tanh(0.5 * (x-8))',
      Magnification: '0.5 + 0.5 * Math.tanh(0.5 * (x-8))',
      Formulation: '0.5 + 0.5 * Math.tanh(0.5 * (x-8))',
      Release: '0.5 + 0.5 * Math.tanh(0.5 * (x-8))'
    },
    'Median Expert': {
      Ideation: '0.5 + 0.5 * Math.tanh(0.5 * (x-8))',
      Acquisition: '0.5 + 0.5 * Math.tanh(0.5 * (x-6))',
      Magnification: '0.5 + 0.5 * Math.tanh(0.5 * (x-5))',
      Formulation: '0.5 + 0.5 * Math.tanh(0.5 * (x-4))',
      Release: '0.5 + 0.5 * Math.tanh(0.5 * (x-3))'
    },
    'Median Difficulty': {
      Ideation: '0.5 + 0.5 * Math.tanh(0.5 * (x-4))',
      Acquisition: '0.5 + 0.5 * Math.tanh(0.5 * (x-7))',
      Magnification: '0.5 + 0.5 * Math.tanh(0.5 * (x-4))',
      Formulation: '0.5 + 0.5 * Math.tanh(0.5 * (x-5))',
      Release: '0.5 + 0.5 * Math.tanh(0.5 * (x-3))'
    }
  };

  // State to store the current mapping functions
  const [mappingFunctions, setMappingFunctions] = useState(presetFunctions.Linear);

  // Function to handle button clicks and update the selected group
  const handleGroupChange = (group) => {
    setSelectedGroup(group);
  };

  // Function to handle preset button clicks
  const handlePresetChange = (preset) => {
    setSelectedPreset(preset);
    setMappingFunctions(presetFunctions[preset]);
  };



  // Function to resample scores for the selected group
  const handleResample = useCallback(() => {
    const groupScores = defaultScoreMatrices[selectedGroup];

    // Create distributions for each stage
    const stageDistributions = Array(5).fill().map((_, stageIndex) => {
      const distribution = Array(11).fill(0);
      groupScores.forEach(row => {
        distribution[row[stageIndex]]++;
      });
      return distribution;
    });

    // Function to sample from a distribution
    const sampleFromDistribution = (distribution) => {
      const total = distribution.reduce((sum, count) => sum + count, 0);
      let random = Math.random() * total;
      for (let i = 0; i < distribution.length; i++) {
        if (random < distribution[i]) return i;
        random -= distribution[i];
      }
      return distribution.length - 1; // Fallback, should rarely happen
    };

    // Generate new scores for the selected group
    const resampledGroupScores = Array(25).fill().map(() =>
      stageDistributions.map(distribution => sampleFromDistribution(distribution))
    );

    // Update only the selected group's scores
    setScoreMatrices(prevScores => ({
      ...prevScores,
      [selectedGroup]: resampledGroupScores
    }));

    setVersion(v => v + 1);
  }, [selectedGroup, defaultScoreMatrices]);

  // Function to reset scores to default for the selected group
  const handleResetDefault = useCallback(() => {
    setScoreMatrices(prevScores => ({
      ...prevScores,
      [selectedGroup]: defaultScoreMatrices[selectedGroup]
    }));
    setVersion(v => v + 1);
  }, [selectedGroup, defaultScoreMatrices]);



    // State for custom scores dialog
  const [scoresDialogOpen, setScoresDialogOpen] = useState(false);
  const [tempScores, setTempScores] = useState([]);
  const [scoreError, setScoreError] = useState('');

  const fileInputRef = useRef(null);

  // Function to handle opening the custom scores dialog
  const handleOpenScoresDialog = () => {
    setTempScores([...scoreMatrices[selectedGroup]]);
    setScoreError('');
    setScoresDialogOpen(true);
  };

  // Function to handle closing the custom scores dialog
  const handleCloseScoresDialog = () => {
    setScoresDialogOpen(false);
    setTempScores([]);
    setScoreError('');
  };

  // Function to handle adding a new row to the score matrix
  const handleAddRow = () => {
    setTempScores([...tempScores, [0, 0, 0, 0, 0]]);
  };

  // Function to handle deleting a row from the score matrix
  const handleDeleteRow = (index) => {
    setTempScores(tempScores.filter((_, i) => i !== index));
  };

  // Function to handle changing a score value
  const handleScoreChange = (rowIndex, colIndex, value) => {
    const newScores = [...tempScores];
    newScores[rowIndex][colIndex] = Number(value);
    setTempScores(newScores);
  };

  // Function to validate the score matrix
  const validateScoreMatrix = (matrix) => {
    if (matrix.length === 0) {
      setScoreError('Score matrix must have at least one row');
      return false;
    }
    for (let row of matrix) {
      if (row.length !== 5) {
        setScoreError('Each row must have exactly 5 values');
        return false;
      }
      for (let score of row) {
        if (!Number.isInteger(score) || score < 0 || score > 10) {
          setScoreError('Scores must be integers between 0 and 10');
          return false;
        }
      }
    }
    return true;
  };

  // Function to handle submitting the custom score matrix
  const handleSubmitScores = () => {
    if (validateScoreMatrix(tempScores)) {
      setScoreMatrices({
        ...scoreMatrices,
        [selectedGroup]: tempScores
      });
      handleCloseScoresDialog();
    }
  };

  // Function to handle downloading the current score matrix
  const handleDownloadScores = () => {
    const dataStr = JSON.stringify(scoreMatrices[selectedGroup], null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${selectedGroup}_scores.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Function to handle uploading a score matrix
  const handleUploadScores = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const uploadedScores = JSON.parse(e.target.result);
        if (Array.isArray(uploadedScores) && validateScoreMatrix(uploadedScores)) {
          setTempScores(uploadedScores);
          setScoreError('');
        } else {
          setScoreError('Invalid file format. Please upload a valid JSON file with score lists.');
        }
      } catch (error) {
        setScoreError('Error parsing JSON file. Please ensure the file is valid JSON.');
      }
    };

    reader.readAsText(file);
  };

  // Custom Scores Dialog component
  const CustomScoresDialog = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${scoresDialogOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Custom Scores for {selectedGroup}</h3>
          <button onClick={handleCloseScoresDialog} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4 flex space-x-2">
          <button onClick={handleAddRow} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
            <Plus size={18} className="mr-2" /> Add Row
          </button>
          <button onClick={handleDownloadScores} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
            <Download size={18} className="mr-2" /> Download Scores
          </button>
          <button onClick={() => fileInputRef.current.click()} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center">
            <Upload size={18} className="mr-2" /> Upload Scores
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleUploadScores}
            style={{ display: 'none' }}
          />
        </div>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th>Ideation</th>
              <th>Acquisition</th>
              <th>Magnification</th>
              <th>Formulation</th>
              <th>Release</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tempScores.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((score, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={score}
                      onChange={(e) => handleScoreChange(rowIndex, colIndex, e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                ))}
                <td>
                  <button onClick={() => handleDeleteRow(rowIndex)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {scoreError && <p className="text-red-500 mb-4">{scoreError}</p>}
        <button
          onClick={handleSubmitScores}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );



  const [statsDialogOpen, setStatsDialogOpen] = useState(false);


  // Function to calculate mean and std
  const calculateMeanAndStd = (data) => {
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
	const std = Math.pow(variance,0.5)
    return { mean: mean.toFixed(2), std: std.toFixed(2) };
  };

  // Function to perform one-sided t-test
  const performTTest = (group1, group2) => {

	const mean1 = group1.reduce((sum, value) => sum + value, 0) / group1.length;
	const mean2 = group2.reduce((sum, value) => sum + value, 0) / group2.length;
	const ttest2 = require( '@stdlib/stats-ttest2' );
	const out = ttest2( group1, group2);
	let pValue = out["pValue"]
	if(mean1<mean2){
		pValue = pValue/2;
	}
	else
	{
		pValue = 1-(pValue/2);
	}

    return pValue.toFixed(4);
  };


  // ViewStatsDialog component
  const ViewStatsDialog = () => {
    const groups = ['student_internet', 'student_llm', 'expert_internet', 'expert_llm'];
    const stages = ['Ideation', 'Acquisition', 'Magnification', 'Formulation', 'Release'];

    const stats = useMemo(() => {
      return groups.reduce((acc, group) => {
	    console.log(acc, group)
		console.log(acc)
        acc[group] = stages.reduce((stageAcc, stage, index) => {
		  console.log(index)
		  console.log(scoreMatrices[group])
          const stageScores = scoreMatrices[group].map(row => row[index]);
          stageAcc[stage] = calculateMeanAndStd(stageScores);
          return stageAcc;
        }, {});
        acc[group].totalSuccessProbability = calculateTotalSuccessProbabilityForStats(scoreMatrices[group]);
        return acc;
      }, {});
    }, [scoreMatrices]);

    const tTests = useMemo(() => {
      const tests = [
        { name: 'Students vs Students LLM', group1: 'student_internet', group2: 'student_llm' },
        { name: 'Experts vs Experts LLM', group1: 'expert_internet', group2: 'expert_llm' },
        { name: 'Students vs Experts', group1: ['student_internet', 'student_llm'], group2: ['expert_internet', 'expert_llm'] },
        { name: 'Students LLM vs Experts LLM', group1: 'student_llm', group2: 'expert_llm' }
      ];

      return tests.reduce((acc, test) => {
        acc[test.name] = stages.reduce((stageAcc, stage, index) => {
          const group1Data = Array.isArray(test.group1)
            ? test.group1.flatMap(g => scoreMatrices[g].map(row => row[index]))
            : scoreMatrices[test.group1].map(row => row[index]);
          const group2Data = Array.isArray(test.group2)
            ? test.group2.flatMap(g => scoreMatrices[g].map(row => row[index]))
            : scoreMatrices[test.group2].map(row => row[index]);
          stageAcc[stage] = performTTest(group1Data, group2Data);
          return stageAcc;
        }, {});
        return acc;
      }, {});
    }, [scoreMatrices]);

    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${statsDialogOpen ? '' : 'hidden'}`}>
        <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Statistics</h2>
            <button onClick={() => setStatsDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {groups.map(group => (
            <div key={group} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{group.replace('_', ' ').toUpperCase()}</h3>
              <table className="w-full border-collapse border border-gray-300 mb-2">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">Stage</th>
                    <th className="border border-gray-300 px-2 py-1">Mean</th>
                    <th className="border border-gray-300 px-2 py-1">STD</th>
                  </tr>
                </thead>
                <tbody>
                  {stages.map(stage => (
                    <tr key={stage}>
                      <td className="border border-gray-300 px-2 py-1">{stage}</td>
                      <td className="border border-gray-300 px-2 py-1">{stats[group][stage].mean}</td>
                      <td className="border border-gray-300 px-2 py-1">{stats[group][stage].std}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Total Success Probability: {(stats[group].totalSuccessProbability*100).toFixed(2)}%</p>
            </div>
          ))}

          <h3 className="text-xl font-semibold mb-2">T-Test P-Values (One-sided)</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">Comparison</th>
                {stages.map(stage => (
                  <th key={stage} className="border border-gray-300 px-2 py-1">{stage}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(tTests).map(([testName, testResults]) => (
                <tr key={testName}>
                  <td className="border border-gray-300 px-2 py-1">{testName}</td>
                  {stages.map(stage => (
                    <td key={stage} className="border border-gray-300 px-2 py-1">{testResults[stage]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // State for custom equation dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState('');
  const [equationError, setEquationError] = useState('');

  // Ref for the input element
  const inputRef = useRef(null);

  // Function to validate equation
  const validateEquation = (equation) => {
    try {
      // Test the equation with sample values
      for (let x = 0; x <= 10; x++) {
        const result = eval(equation);
        if (isNaN(result) || result < 0 || result > 1) {
          throw new Error('Equation must return a value between 0 and 1 for all inputs between 0 and 10');
        }
      }
      return true;
    } catch (error) {
      setEquationError(error.message);
      return false;
    }
  };

  // Function to handle dialog open
  const handleOpenDialog = (stage) => {
    setCurrentStage(stage);
    setEquationError('');
    setDialogOpen(true);
  };

  // Function to handle dialog close
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentStage('');
    setEquationError('');
  };

  // Function to handle equation submit
  const handleEquationSubmit = () => {
    const newEquation = inputRef.current.value;
    if (validateEquation(newEquation)) {
      setMappingFunctions(prev => ({
        ...prev,
        [currentStage]: newEquation
      }));
      handleCloseDialog();
    }
  };

  // Custom Equation Dialog component
  const CustomEquationDialog = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${dialogOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Custom Equation for {currentStage}</h3>
          <button onClick={handleCloseDialog} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          defaultValue={mappingFunctions[currentStage]}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter equation (use 'x' as the variable)"
        />
        {equationError && <p className="text-red-500 mb-4">{equationError}</p>}
        <button
          onClick={handleEquationSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
  // Function to prepare data for histograms based on the selected group
  const prepareHistogramData = useMemo(() => {
    const groupData = scoreMatrices[selectedGroup];

    const stages = ['Ideation', 'Acquisition', 'Magnification', 'Formulation', 'Release'];
    return stages.map((stage, index) => {
      const scores = groupData.map(row => row[index]);
      const counts = Array(11).fill(0); // 0-10 possible scores
      scores.forEach(score => counts[score]++);
      return counts.map((count, score) => ({ score, count }));
    });
  }, [selectedGroup,version]);

  // Function to calculate success probabilities and assign colors
  const calculateSuccessProbabilities = useMemo(() => {
    const groupData = scoreMatrices[selectedGroup];

    const stages = ['Ideation', 'Acquisition', 'Magnification', 'Formulation', 'Release'];

    const probabilities = groupData.map((row, index) => {
      const probability = stages.reduce((acc, stage, i) => {
        const score = row[i];
        const mappingFunction = mappingFunctions[stage];
        const mappedProb = Math.max(0, Math.min(1, eval(mappingFunction.replace(/x/g, score))));
        return acc * mappedProb;
      }, 1);

      return { id: index, probability, scores: row };
    }).sort((a, b) => b.probability - a.probability);

    // Assign colors based on rank
    const colorScale = (t) => `hsl(0, 100%, ${Math.max(0,((1-t)-0.5)*100)}%)`;
    probabilities.forEach((item, index) => {
	  item.rank = index / (probabilities.length - 1)
      item.fill = colorScale(item.rank);
    });

    return probabilities;
  }, [selectedGroup, mappingFunctions, version]);

  // New function to calculate success probabilities for stats
  const calculateSuccessProbabilitiesForStats = (group) => {
    const stages = ['Ideation', 'Acquisition', 'Magnification', 'Formulation', 'Release'];
    return group.map(row => {
      const probability = stages.reduce((acc, stage, i) => {
        const score = row[i];
        const mappingFunction = mappingFunctions[stage];
        const mappedProb = Math.max(0, Math.min(1, eval(mappingFunction.replace(/x/g, score))));
        return acc * mappedProb;
      }, 1);
      return { probability };
    });
  };

  // Function to calculate total success probability for stats
  const calculateTotalSuccessProbabilityForStats = (group) => {
    const probabilities = calculateSuccessProbabilitiesForStats(group);
    return (probabilities.reduce((sum, item) => sum + item.probability, 0));
  };


  // Histogram component
  const Histogram = ({ data, title }) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="score" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // Probability Mapping Function Plot component with colored dots
  const ProbabilityPlot = ({ func, title, stageIndex, successProbabilities = [] }) => {
    const lineData = useMemo(() => {
      return Array.from({ length: 101 }, (_, i) => {
        const x = i / 10;
        const y = Math.max(0, Math.min(1, eval(func.replace(/x/g, x))));
        return { x, y };
      });
    }, [func]);

    const dotData = useMemo(() => {
      return (successProbabilities || []).map(item => ({
        x: item.scores[stageIndex],
        y: eval(func.replace(/x/g, item.scores[stageIndex])),
        fill: item.fill,
        id: item.id,
		rank: item.rank
      }));
    }, [successProbabilities, func, stageIndex]);

    // Apply jitter to avoid overlapping
    const jitteredDotData = dotData.map(dot => ({
      ...dot,
      x: dot.x + (Math.random() - 0.5) * 0.2,
      y: dot.y + (Math.random() - 0.5) * 0.02
    }));

    return (
      <div className="mb-4">
	  <div className="flex items-center">
		  <h3 className="text-lg font-semibold mb-0 mr-2">{title}</h3>
		  <button onClick={() => handleOpenDialog(title)} className="text-gray-500 hover:text-gray-700">
			<Settings size={20} />
		  </button>
	  </div>

        {/*<p className="mb-2">Function: {func}</p> */}
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis
				type="number"
				dataKey="x"
				name="score"
				domain={[0, 10]}
				ticks={[0, 2, 4, 6, 8, 10]}
            />
            <YAxis
				type="number"
				dataKey="y"
				name="probability"
				domain={[-0.1, 1]}
				ticks={[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]}
            />
            <ZAxis range={[40]} />
            <Line type="monotone" dataKey="y" data={lineData} stroke="#8884d8" dot={false} isAnimationActive={false} />
            <Scatter data={jitteredDotData} fill={(entry) => entry.fill} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };


  // Success Probability Chart component with colored squares
  const SuccessProbabilityChart = ({ data }) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Success Probability Ranking</h3>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" />
          <YAxis dataKey="id" type="category" tickFormatter={() => ''} />
		  <Tooltip
            formatter={(value) => [`${(value * 100).toFixed(2)}%`]}
            labelFormatter={() => ''}
          />
          <Bar dataKey="probability" fill={(entry) => entry.fill} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );



  // Preset Toggle Buttons component
  const PresetToggleButtons = () => (
    <div className="flex flex-wrap justify-center mt-4">
      {Object.keys(presetFunctions).map((preset) => (
        <button
          key={preset}
          className={`px-3 py-1 m-1 rounded ${
            selectedPreset === preset ?  'bg-blue-500 text-white' : 'bg-blue-900 text-white'
          }`}
          onClick={() => handlePresetChange(preset)}
        >
          {preset}
        </button>
      ))}
    </div>
  );


  return (
    <div className="flex flex-col h-screen" key={version}>
      {/* Header */}
      <header className="bg-blue-500 p-4 text-white flex flex-col items-center">
        <div className="mb-4">
          <div className="flex space-x-4">
            <button 
              className={`px-4 py-2 rounded ${selectedGroup === 'student_internet' ? 'bg-white text-blue-500' : 'bg-blue-700 text-white'}`}
              onClick={() => handleGroupChange('student_internet')}
            >
              Student
            </button>
            <button 
              className={`px-4 py-2 rounded ${selectedGroup === 'student_llm' ? 'bg-white text-blue-500' : 'bg-blue-700 text-white'}`}
              onClick={() => handleGroupChange('student_llm')}
            >
              Student with LLM
            </button>
            <button 
              className={`px-4 py-2 rounded ${selectedGroup === 'expert_internet' ? 'bg-white text-blue-500' : 'bg-blue-700 text-white'}`}
              onClick={() => handleGroupChange('expert_internet')}
            >
              Expert
            </button>
            <button 
              className={`px-4 py-2 rounded ${selectedGroup === 'expert_llm' ? 'bg-white text-blue-500' : 'bg-blue-700 text-white'}`}
              onClick={() => handleGroupChange('expert_llm')}
            >
              Expert with LLM
            </button>
          </div>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setStatsDialogOpen(true)}>View Stats</button>
      </header>

      {/* Main content area */}
      <main className="flex-grow flex">
        {/* Left panel with histograms */}
        <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Score Distributions</h2>
			<h3 className="text-lg font-semibold mb-2">Change Scores</h3>
			<div className="flex space-x-4">
			 <button 
				onClick={handleResetDefault}
				className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 mb-4"
			  >
			   Reset Default Scores
			  </button>
			  <button
				onClick={handleResample}
				className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 mb-4"
			  >
			   Resample Scores
			  </button>
			  <button
				onClick={handleOpenScoresDialog}
				className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 mb-4"
			  >
				Custom Scores
			  </button>
			  </div>
          {prepareHistogramData.map((data, index) => (
            <Histogram 
			  key={`histogram-${index}-${version}`}
              data={data} 
              title={['Ideation', 'Acquisition', 'Magnification', 'Formulation', 'Release'][index]} 
            />
          ))}
        </div>


        {/* Middle panel with probability mapping functions */}
        <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Probability Mapping Functions</h2>
          <h3 className="text-xl font-semibold mb-4">Presets</h3>
          <PresetToggleButtons />
          {Object.entries(mappingFunctions).map(([stage, func], index) => (
            <ProbabilityPlot
			  key={`histogram-${stage}-${version}`}
              func={func}
              title={stage}
              stageIndex={index}
              successProbabilities={calculateSuccessProbabilities}
            />
          ))}
        </div>


        {/* Right panel with Success Probability chart */}
        <div className="flex-1 bg-gray-300 p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Success Probability</h2>
          <h3 className="text-lg font-semibold mb-2">Total Success Probability</h3>
		  <h4> {(calculateSuccessProbabilities.reduce((sum, item) => sum + item.probability, 0)*100).toFixed(2)}% </h4>
          <SuccessProbabilityChart data={calculateSuccessProbabilities} />
        </div>

      </main>


      <CustomEquationDialog />
      <CustomScoresDialog />
      <ViewStatsDialog />
    </div>
  );
};

export default AppLayout;
