import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';

const BACKGROUND_COLOR = '#007DB3';
const BACKGROUND_STROKE_COLOR = '#e2e8f0';
const STROKE_COLOR = '#19853b';

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressBarAnimation = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    };
  });

  const progressNumber = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPress = () => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 3000 });
  };

  return (
    <View style={styles.container}>
      <ReText style={styles.progressNumber} text={progressNumber} />
      <Svg style={{ position: 'absolute' }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          fill={'none'}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          fill={'none'}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeLinecap={'round'}
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH}
          animatedProps={animatedProps}
        />
      </Svg>
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.buttonText}>Verzenden</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProgressBarAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  progressNumber: {
    fontSize: 80,
    color: 'rgba(226, 232, 240, 0.9)',
    textAlign: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? '50%' : '45%',
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: '#19853b',
    letterSpacing: 1,
  },
});
