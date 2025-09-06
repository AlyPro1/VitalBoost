// Supabase Analytics Client for VitalBoost
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Analytics API endpoint
const ANALYTICS_ENDPOINT = `${supabaseUrl}/functions/v1/analyze-user-input`

// Helper function to get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper function to get or create session ID
let currentSessionId = null
export function getSessionId() {
  if (!currentSessionId) {
    currentSessionId = crypto.randomUUID()
  }
  return currentSessionId
}

// Send data to analytics Edge Function
async function sendAnalytics(type, data, userId = null, sessionId = null) {
  try {
    const user = userId || await getCurrentUser()
    const session = sessionId || getSessionId()

    const response = await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        userId: user?.id,
        sessionId: session
      })
    })

    if (!response.ok) {
      throw new Error(`Analytics request failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Analytics error:', error)
    return null
  }
}

// Track health queries (AI Doctor chat)
export async function trackHealthQuery(query, response = null) {
  return await sendAnalytics('health_query', {
    query,
    response,
    sessionId: getSessionId()
  })
}

// Track fitness activities
export async function trackFitnessActivity(activityType, data = {}) {
  return await sendAnalytics('fitness_activity', {
    activityType,
    ...data
  })
}

// Track daily goals
export async function trackDailyGoal(goalType, goalText, targetValue = null, currentValue = null, completed = false) {
  return await sendAnalytics('daily_goal', {
    goalType,
    goalText,
    targetValue,
    currentValue,
    completed
  })
}

// Track health tip interactions
export async function trackHealthTipInteraction(tipId, tipTitle, interactionType, durationSeconds = null) {
  return await sendAnalytics('health_tip_interaction', {
    tipId,
    tipTitle,
    interactionType,
    durationSeconds
  })
}

// Track user sessions and actions
export async function trackUserAction(action, pageView = null, additionalData = {}) {
  return await sendAnalytics('user_session', {
    action,
    pageView,
    deviceInfo: {
      userAgent: navigator.userAgent,
      screen: {
        width: screen.width,
        height: screen.height
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      ...additionalData
    }
  })
}

// Specific tracking functions for VitalBoost features

// Track step counting
export async function trackSteps(steps, duration = null) {
  return await trackFitnessActivity('steps', {
    steps,
    duration,
    timestamp: new Date().toISOString()
  })
}

// Track calories burned
export async function trackCaloriesBurned(activityType, calories, duration) {
  return await trackFitnessActivity('calories', {
    activityType,
    calories,
    duration,
    timestamp: new Date().toISOString()
  })
}

// Track modal interactions
export async function trackModalOpen(modalName) {
  return await trackUserAction(`modal_open_${modalName}`)
}

export async function trackModalClose(modalName) {
  return await trackUserAction(`modal_close_${modalName}`)
}

// Track button clicks
export async function trackButtonClick(buttonName, context = null) {
  return await trackUserAction(`button_click_${buttonName}`, null, { context })
}

// Track page views
export async function trackPageView(pageName) {
  return await trackUserAction('page_view', pageName)
}

// Track goal completions
export async function trackGoalCompletion(goalType, goalText) {
  return await trackDailyGoal(goalType, goalText, null, null, true)
}

// Track health tip views
export async function trackHealthTipView(tipId, tipTitle, viewDuration = null) {
  return await trackHealthTipInteraction(tipId, tipTitle, 'view', viewDuration)
}

// Initialize analytics on page load
export function initializeAnalytics() {
  // Track initial page load
  trackPageView('home')
  
  // Track session start
  trackUserAction('session_start')
  
  // Track when user leaves the page
  window.addEventListener('beforeunload', () => {
    trackUserAction('session_end')
  })
  
  // Track visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackUserAction('page_hidden')
    } else {
      trackUserAction('page_visible')
    }
  })
}

// User profile management
export async function updateUserProfile(profileData) {
  try {
    const user = await getCurrentUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        email: user.email,
        ...profileData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
    return null
  }
}

// Get user analytics dashboard data
export async function getUserAnalytics(timeframe = '7d') {
  try {
    const user = await getCurrentUser()
    if (!user) return null

    const endDate = new Date()
    const startDate = new Date()
    
    switch (timeframe) {
      case '1d':
        startDate.setDate(endDate.getDate() - 1)
        break
      case '7d':
        startDate.setDate(endDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(endDate.getDate() - 30)
        break
      default:
        startDate.setDate(endDate.getDate() - 7)
    }

    // Get fitness activities
    const { data: fitnessData } = await supabase
      .from('fitness_activities')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())

    // Get health queries
    const { data: healthQueries } = await supabase
      .from('health_queries')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())

    // Get daily goals
    const { data: dailyGoals } = await supabase
      .from('daily_goals')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])

    return {
      fitness: fitnessData || [],
      healthQueries: healthQueries || [],
      dailyGoals: dailyGoals || [],
      summary: {
        totalSteps: fitnessData?.reduce((sum, activity) => sum + (activity.steps_count || 0), 0) || 0,
        totalCalories: fitnessData?.reduce((sum, activity) => sum + (activity.calories_burned || 0), 0) || 0,
        completedGoals: dailyGoals?.filter(goal => goal.completed).length || 0,
        totalQueries: healthQueries?.length || 0
      }
    }
  } catch (error) {
    console.error('Error fetching user analytics:', error)
    return null
  }
}