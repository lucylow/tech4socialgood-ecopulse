# 🌍 EcoPulse Accessibility Guide

EcoPulse is committed to providing an inclusive and accessible climate education experience for all users. This document outlines the accessibility features and how to use them effectively.

## 🎯 Accessibility Features

### 🎨 Visual Accessibility

#### High Contrast Mode
- **Toggle**: Press `F1` to open accessibility settings, then enable "High Contrast Mode"
- **Benefits**: Increases color contrast for users with visual impairments
- **Implementation**: Uses WCAG AA compliant color combinations (4.5:1 contrast ratio minimum)

#### Color Blind Support
- **Color Coding**: All status indicators use both color and text labels
- **Pattern Support**: Progress bars include visual patterns alongside colors
- **Alternative Indicators**: Icons and text provide context beyond color alone

#### Reduced Motion
- **Toggle**: Enable "Reduce Motion" in accessibility settings
- **Benefits**: Removes animations for users with vestibular disorders
- **Implementation**: Respects `prefers-reduced-motion` CSS media query

### ⌨️ Keyboard Navigation

#### Keyboard Shortcuts
- **`R`**: Reset Earth simulation
- **`Space`**: Pause/Resume simulation
- **`I`**: Focus on command input
- **`F1`**: Open accessibility panel
- **`Escape`**: Close accessibility panel

#### Focus Management
- **Visible Focus**: All interactive elements have clear focus indicators
- **Logical Tab Order**: Navigation follows a logical sequence
- **Skip Links**: "Skip to main content" link available for screen reader users

### 🔊 Screen Reader Support

#### ARIA Labels
- **Progress Bars**: All metrics include `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Regions**: Main sections use `role="region"` with descriptive labels
- **Live Regions**: Dynamic content updates are announced to screen readers

#### Semantic HTML
- **Headings**: Proper heading hierarchy (h1, h2, h3)
- **Lists**: Use semantic list elements for related items
- **Buttons**: All buttons have descriptive `aria-label` attributes

### 🌐 Internationalization

#### Multi-Language Support
- **Languages**: English, Spanish, French, German, Chinese, Japanese, Arabic, Hindi, Portuguese, Russian
- **Toggle**: Select language in accessibility settings
- **Formatting**: Numbers and percentages formatted according to locale

#### Cultural Sensitivity
- **Inclusive Content**: Environmental scenarios consider global perspectives
- **Regional Examples**: Climate data includes examples from different regions
- **Neutral Terminology**: Avoids culturally specific references

### 📱 Mobile Accessibility

#### Touch Targets
- **Minimum Size**: All interactive elements meet 44px minimum touch target size
- **Spacing**: Adequate spacing between interactive elements
- **Gesture Support**: Alternative methods for all gestures

#### Responsive Design
- **Flexible Layout**: Adapts to different screen sizes
- **Readable Text**: Minimum 16px font size on mobile
- **Zoom Support**: Supports up to 200% zoom without horizontal scrolling

## 🛠️ Technical Implementation

### WCAG 2.1 Compliance
- **Level AA**: Meets WCAG 2.1 AA standards
- **Testing**: Regular accessibility audits with automated and manual testing
- **Validation**: Uses axe-core and WAVE for accessibility validation

### Browser Support
- **Modern Browsers**: Full support for Chrome, Firefox, Safari, Edge
- **Assistive Technology**: Compatible with NVDA, JAWS, VoiceOver, TalkBack
- **Fallbacks**: Graceful degradation for older browsers

### Performance
- **Fast Loading**: Optimized for users with slower connections
- **Reduced Data**: Option to disable animations and reduce data usage
- **Offline Support**: Core functionality works offline

## 📋 Usage Guidelines

### For Users with Visual Impairments
1. Enable high contrast mode for better visibility
2. Use screen readers with the provided ARIA labels
3. Navigate using keyboard shortcuts
4. Enable reduced motion if animations cause discomfort

### For Users with Motor Impairments
1. Use keyboard navigation instead of mouse
2. Enable sticky keys if needed
3. Use voice control software with the accessible controls
4. Adjust touch targets if using touch devices

### For Users with Cognitive Impairments
1. Use the simplified view option
2. Enable reduced motion to minimize distractions
3. Take breaks during extended use
4. Use the help system for guidance

### For Users with Hearing Impairments
1. All content is visual - no audio-only information
2. Use captions for any video content
3. Visual indicators replace audio notifications

## 🔧 Developer Resources

### Testing Tools
- **axe-core**: Automated accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Accessibility audit in Chrome DevTools
- **Screen Readers**: Test with NVDA, JAWS, VoiceOver

### Best Practices
1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Provide descriptive labels for complex widgets
3. **Color Contrast**: Ensure sufficient contrast ratios
4. **Keyboard Navigation**: Test all functionality with keyboard only
5. **Focus Management**: Maintain logical focus order

### Code Examples

#### Accessible Button
```tsx
<button
  onClick={handleClick}
  aria-label="Reset Earth simulation to initial state"
  title="Reset Earth (R)"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  Reset Earth
</button>
```

#### Accessible Progress Bar
```tsx
<div
  role="progressbar"
  aria-label="CO2 Level: 415 ppm"
  aria-valuenow={415}
  aria-valuemin={0}
  aria-valuemax={2000}
>
  <div style={{ width: '20.75%' }} />
</div>
```

## 📞 Support and Feedback

### Reporting Issues
- **GitHub Issues**: Report accessibility bugs on our GitHub repository
- **Email**: accessibility@ecopulse.org
- **Feedback Form**: Use the in-app feedback system

### Getting Help
- **Documentation**: Comprehensive guides available in-app
- **Community**: Join our Discord for accessibility discussions
- **Training**: Accessibility workshops available for educators

## 🔄 Continuous Improvement

### Regular Updates
- **Monthly Audits**: Regular accessibility testing
- **User Feedback**: Incorporate user suggestions
- **Standards Updates**: Stay current with WCAG guidelines
- **Technology Advances**: Adopt new accessibility technologies

### Community Involvement
- **Beta Testing**: Join our accessibility beta program
- **User Research**: Participate in usability studies
- **Feedback Sessions**: Regular community feedback sessions

---

## 📚 Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Resources](https://webaim.org/)
- [Accessibility for Teams](https://accessibility.digital.gov/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)

**Last Updated**: December 2024
**Version**: 1.0.0

---

*EcoPulse is committed to making climate education accessible to everyone. If you encounter any accessibility barriers, please let us know so we can improve the experience for all users.*
