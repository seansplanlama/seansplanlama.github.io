// Ionicons, the app's icon set (S2-02 bölüm 4). The package exports each icon as an
// SVG data URI; IonIcon inlines it at build time, so no icon font or request is needed.
import {
  arrowForward,
  chatbubblesOutline,
  pawOutline,
  schoolOutline,
  trophyOutline,
} from 'ionicons/icons';

export const icons = {
  arrowForward,
  chatbubblesOutline,
  pawOutline,
  schoolOutline,
  trophyOutline,
};

export type IconName = keyof typeof icons;
