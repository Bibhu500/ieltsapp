
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const ScoreCard = ({ overallBand, taskResponse, coherenceCohesion, lexicalResource, grammaticalRangeAccuracy }) => {
  return (
    <div className="mb-8">
      {/* Overall Band */}
      <div className="flex justify-center items-center mb-4">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Overall Band</p>
          <div style={{ position: 'relative', width: 100, height: 100 }}>
            <CircularProgress
              variant="determinate"
              value={(overallBand / 9) * 100}
              size={90}
              thickness={4}
              style={{ color: '#00E676' }} 
            />
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {overallBand}
            </Typography>
          </div>
        </div>
      </div>
      {/* Sectional Bands */}
      <div className="flex justify-between space-x-5 text-xs rounded-lg items-center">
        {/* Task Response */}
        <div className="flex flex-col items-center">
          <p className='text-sm/[17px] font-bold md:text-sm'>Task Response</p>
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            <CircularProgress variant="determinate" value={(taskResponse / 9) * 100} size={55} thickness={4} style={{ color: '#FF5722' }} /> 
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {taskResponse}
            </Typography>
          </div>
        </div>
        {/* Coherence and Cohesion */}
        <div className="flex flex-col items-center">
          <p className='text-sm/[17px] font-bold md:text-sm'>Coherence and Cohesion</p>
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            <CircularProgress variant="determinate" value={(coherenceCohesion / 9) * 100} size={55} thickness={4} style={{ color: '#2196F3' }} /> 
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {coherenceCohesion}
            </Typography>
          </div>
        </div>
        {/* Lexical Resource */}
        <div className="flex flex-col items-center">
          <p className='text-sm/[17px] font-bold md:text-sm' >Lexical Resource</p>
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            <CircularProgress variant="determinate" value={(lexicalResource / 9) * 100} size={55} thickness={4} style={{ color: '#9C27B0' }} /> 
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {lexicalResource}
            </Typography>
          </div>
        </div>
        {/* Grammatical Range & Accuracy */}
        <div className="flex flex-col items-center">
          <p className='text-sm/[17px] font-bold md:text-sm'>GrammaticalRange  &Accuracy</p>
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            <CircularProgress variant="determinate" value={(grammaticalRangeAccuracy / 9) * 100} size={55} thickness={4} style={{ color: '#FF9800' }} /> 
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {grammaticalRangeAccuracy}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
